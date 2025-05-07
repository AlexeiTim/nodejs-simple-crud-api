"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const user_controller_1 = require("./controllers/user.controller");
const router_1 = require("./router");
const registerRoutes = () => {
    router_1.router.get("/users", user_controller_1.userController.findAll);
    router_1.router.get("/users/:id", user_controller_1.userController.findOne);
    router_1.router.delete("/users/:id", user_controller_1.userController.delete);
    router_1.router.put("/users/:id", user_controller_1.userController.update);
    router_1.router.post("/users", user_controller_1.userController.create);
};
exports.registerRoutes = registerRoutes;
