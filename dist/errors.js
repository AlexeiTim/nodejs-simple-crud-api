"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.ServerError = ServerError;
