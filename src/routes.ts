import { userController } from "./controllers/user.controller";
import { router } from "./router";

export const registerRoutes = () => {
  router.get("/users", userController.findAll);
  router.get("/users/:id", userController.findOne);
  router.delete("/users/:id", userController.delete);
  router.put("/users/:id", userController.update);
  router.post("/users", userController.create);
};
