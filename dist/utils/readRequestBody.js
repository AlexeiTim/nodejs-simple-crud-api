"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReqBody = void 0;
const parseReqBody = (req) => {
    return new Promise((res, rej) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            if (typeof body !== "string") {
                rej(body);
            }
            else {
                try {
                    res(JSON.parse(body));
                }
                catch (e) {
                    rej("Not valid json body");
                }
            }
        });
        req.on("error", rej);
    });
};
exports.parseReqBody = parseReqBody;
