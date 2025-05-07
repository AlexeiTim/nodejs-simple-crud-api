import { server } from "../main";
import { afterAll } from "@jest/globals";

afterAll(async () => {
  server?.close();
});
