import http from "http";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config();
export const server = http.createServer(async (req, res) => {
  router.use(req, res);
});
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log("server work on port: " + port);
});
