import { IncomingMessage } from "http";
import { ServerError } from "../errors";

export const parseReqBody = (req: IncomingMessage): Promise<unknown> => {
  return new Promise((res, rej) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (typeof body !== "string") {
        rej(body);
      } else {
        try {
          res(JSON.parse(body));
        } catch (e) {
          rej("Not valid json body");
        }
      }
    });

    req.on("error", rej);
  });
};
