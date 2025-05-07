"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.createRouter = void 0;
const routes_1 = require("./routes");
const readRequestBody_1 = require("./utils/readRequestBody");
var METHODS;
(function (METHODS) {
    METHODS["POST"] = "POST";
    METHODS["GET"] = "GET";
    METHODS["PUT"] = "PUT";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
const registeredMethods = {
    [METHODS.POST]: {},
    [METHODS.GET]: {},
    [METHODS.PUT]: {},
    [METHODS.DELETE]: {},
};
function checkParams(registeredUrl, incomingUrl) {
    const registeredParts = registeredUrl.split("/");
    const incomingParts = incomingUrl.split("/");
    if (registeredParts.length !== incomingParts.length) {
        return { match: false, params: {} };
    }
    const params = {};
    for (let i = 0; i < registeredParts.length; i += 1) {
        const actualRegPart = registeredParts[i];
        const actualIncPart = incomingParts[i];
        if (actualRegPart.startsWith(":")) {
            const paramName = actualRegPart.slice(1);
            params[paramName] = actualIncPart;
        }
        else if (actualRegPart !== actualIncPart) {
            return { match: false, params: {} };
        }
    }
    return { match: true, params };
}
const createRouter = () => {
    function get(url, cb) {
        registeredMethods[METHODS.GET][url] = cb;
    }
    function post(url, cb) {
        registeredMethods[METHODS.POST][url] = cb;
    }
    function put(url, cb) {
        registeredMethods[METHODS.PUT][url] = cb;
    }
    function remove(url, cb) {
        registeredMethods[METHODS.DELETE][url] = cb;
    }
    async function use(req, res) {
        const { method, url } = req;
        if (!url) {
            res.statusCode = 404;
            res.setHeader("COntent-type", "Application/json");
            res.end(JSON.stringify({
                message: "URL not exists",
            }));
            return;
        }
        if (!method || !Object.values(METHODS).includes(method)) {
            res.end("Method not allowed");
            return;
        }
        const routes = Object.entries(registeredMethods[method]);
        for (const [route, handler] of routes) {
            const { match, params } = checkParams(route, url);
            if (match) {
                try {
                    const body = await (0, readRequestBody_1.parseReqBody)(req);
                    await handler(req, res, {
                        params,
                        body,
                    });
                    return;
                }
                catch (e) {
                    res.statusCode = 500;
                    res.setHeader("Content-type", "Application/json");
                    res.end(JSON.stringify({
                        error: "Interval server",
                        message: typeof e === "string" ? e : e.message,
                    }));
                    return;
                }
            }
        }
        res.statusCode = 404;
        res.setHeader("Content-type", "Application/json");
        res.end(JSON.stringify({
            message: "Endpoint not exists",
        }));
    }
    return {
        get,
        post,
        put,
        delete: remove,
        use,
    };
};
exports.createRouter = createRouter;
const router = (0, exports.createRouter)();
exports.router = router;
(0, routes_1.registerRoutes)();
