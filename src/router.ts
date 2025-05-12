import { IncomingMessage, ServerResponse } from "http";
import { registerRoutes } from "./routes";
import { ReqMeta, ReqParams } from "./types";
import { parseReqBody } from "./utils/readRequestBody";
import { DATA_BASE } from "./db";

enum METHODS {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RouterHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  optional: ReqMeta
) => unknown;

interface RouterMethods {
  [key: string]: RouterHandler;
}
interface REGISTERED_METHODS {
  [METHODS.POST]: RouterMethods;
  [METHODS.GET]: RouterMethods;
  [METHODS.PUT]: RouterMethods;
  [METHODS.DELETE]: RouterMethods;
}
const registeredMethods: REGISTERED_METHODS = {
  [METHODS.POST]: {},
  [METHODS.GET]: {},
  [METHODS.PUT]: {},
  [METHODS.DELETE]: {},
};

function checkParams(registeredUrl: string, incomingUrl: string) {
  const registeredParts = registeredUrl.split("/");
  const incomingParts = incomingUrl.split("/");
  if (registeredParts.length !== incomingParts.length) {
    return { match: false, params: {} };
  }

  const params: Record<string, unknown> = {};
  for (let i = 0; i < registeredParts.length; i += 1) {
    const actualRegPart = registeredParts[i];
    const actualIncPart = incomingParts[i];

    if (actualRegPart.startsWith(":")) {
      const paramName = actualRegPart.slice(1);
      params[paramName] = actualIncPart;
    } else if (actualRegPart !== actualIncPart) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}
export const createRouter = () => {
  function get(url: string, cb: RouterHandler) {
    registeredMethods[METHODS.GET][url] = cb;
  }

  function post(url: string, cb: RouterHandler) {
    registeredMethods[METHODS.POST][url] = cb;
  }

  function put(url: string, cb: RouterHandler) {
    registeredMethods[METHODS.PUT][url] = cb;
  }

  function remove(url: string, cb: RouterHandler) {
    registeredMethods[METHODS.DELETE][url] = cb;
  }

  async function use(
    req: IncomingMessage,
    res: ServerResponse,
    optional?: { dbState: typeof DATA_BASE }
  ) {
    if (optional?.dbState) {
      DATA_BASE.updateDB(optional.dbState);
    }

    const { method, url } = req;

    if (!url) {
      res.statusCode = 404;
      res.setHeader("COntent-type", "Application/json");
      res.end(
        JSON.stringify({
          message: "URL not exists",
        })
      );
      return;
    }

    if (!method || !Object.values(METHODS).includes(method as METHODS)) {
      res.end("Method not allowed");
      return;
    }

    const routes = Object.entries(registeredMethods[method as METHODS]);
    for (const [route, handler] of routes) {
      const { match, params } = checkParams(route, url);
      if (match) {
        try {
          const body = await parseReqBody(req);
          await handler(req, res, {
            params,
            body,
          });
          return;
        } catch (e) {
          res.statusCode = 500;
          res.setHeader("Content-type", "Application/json");
          res.end(
            JSON.stringify({
              error: "Interval server",
              message: typeof e === "string" ? e : (e as Error).message,
            })
          );
          return;
        }
      }
    }

    res.statusCode = 404;
    res.setHeader("Content-type", "Application/json");
    res.end(
      JSON.stringify({
        message: "Endpoint not exists",
      })
    );
  }

  return {
    get,
    post,
    put,
    delete: remove,
    use,
  };
};

const router = createRouter();
registerRoutes();

export { router };
