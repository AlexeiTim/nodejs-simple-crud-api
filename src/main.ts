import http from "http";
import { router } from "./router";

const server = http.createServer(async (req, res) => {
  router.use(req, res);
});

server.listen(3000, "", () => {
  console.log("server work");
});
