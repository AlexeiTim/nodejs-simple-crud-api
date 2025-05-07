"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
dotenv_1.default.config();
const server = http_1.default.createServer(async (req, res) => {
    router_1.router.use(req, res);
});
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log("server work on port: " + port);
});
