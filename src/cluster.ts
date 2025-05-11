import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import { router } from "./router";
import { DATA_BASE } from "./db";

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

const numCPUs = os.cpus().length - 1;

interface RequestData {
  method?: string;
  url?: string;
  headers: Record<string, string>;
  body: string;
  actualDB: typeof DATA_BASE;
}

interface ResponseData {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  updatedDB: typeof DATA_BASE;
}

type WorkerMessage = RequestData;

let workerIndexForCall = 0;
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    const workerPort = PORT + i + 1;
    cluster.fork({ WORKER_PORT: workerPort });
  }

  const loadBalancer = createServer((req, res) => {
    if (!cluster.workers) {
      res.statusCode = 503;
      res.end("No workers available");
      return;
    }

    const workers = Object.values(cluster.workers);
    if (workerIndexForCall + 1 >= workers.length) {
      workerIndexForCall = 1;
    } else {
      workerIndexForCall += 1;
    }

    const worker = workers[workerIndexForCall];
    if (worker) {
      console.log("Request to worker: ", workerIndexForCall);
      const requestData: RequestData = {
        method: req.method,
        url: req.url,
        headers: req.headers as Record<string, string>,
        body: "",
        actualDB: DATA_BASE,
      };

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        requestData.body = body;
        worker.send(requestData);
      });

      worker.once("message", (responseData: ResponseData) => {
        DATA_BASE.updateDB(responseData.updatedDB);
        res.statusCode = responseData.statusCode;
        Object.entries(responseData.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        res.end(responseData.body);
      });
    }
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

  cluster.on("exit", (worker, code, signal) => {
    if (!cluster.workers) {
      return;
    }
    const workerPort = PORT + Object.keys(cluster.workers).length + 1;
    cluster.fork({ WORKER_PORT: workerPort });
  });
} else {
  const workerPort = process.env.WORKER_PORT
    ? parseInt(process.env.WORKER_PORT)
    : PORT + 1;

  const server = createServer((_, res) => {
    res.end("Only from balancer call");
  });

  server.listen(workerPort, () => {
    console.log(`Worker ${process.pid} listening on port ${workerPort}`);
  });

  process.on("message", async (message: WorkerMessage) => {
    if ("method" in message) {
      const socket = new Socket();
      const req = new IncomingMessage(socket);
      req.method = message.method;
      req.url = message.url;
      req.headers = message.headers;

      if (message.body) {
        req.push(Buffer.from(message.body));
        req.push(null);
      }

      const res = new ServerResponse(req);

      const originalEnd = res.end;
      res.end = function (chunk?: any, encoding?: any, callback?: any) {
        if (process.send) {
          process.send({
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            body: chunk ? chunk.toString() : "",
            updatedDB: DATA_BASE,
          });
        }
        return originalEnd.call(this, chunk, encoding, callback);
      };

      await router.use(req, res, { dbState: message.actualDB });
    }
  });
}
