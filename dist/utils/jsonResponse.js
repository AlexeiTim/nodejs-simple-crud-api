"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = jsonResponse;
const errors_1 = require("../errors");
function jsonResponse(res, status, data) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(status);
    if (data instanceof errors_1.ServerError) {
        res.end(JSON.stringify({
            message: data.message,
            status: data.status,
        }));
    }
    else {
        res.end(JSON.stringify(data));
    }
}
