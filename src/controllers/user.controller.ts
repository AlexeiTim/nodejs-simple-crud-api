import { userService } from "../services/user.service";
import { validate } from "uuid";
import { CreateUserDto } from "../types";

export const userController = {
  findAll() {
    return userService.findAll();
  },
  findOne(id: string) {
    const isValidId = validate(id);
    if (!isValidId) {
      throw Error("Not valid id");
    }
    return userService.findOne(id);
  },
  create(dto: CreateUserDto) {
    return userController.create(dto);
  },
  update(id: string, dto: CreateUserDto) {
    const isValidId = validate(id);
    if (!isValidId) {
      throw Error("Bad id");
    }
    return userService.update(id, dto);
  },
  delete(id: string) {
    const isValidId = validate(id);
    if (!isValidId) {
      throw Error("Bad id");
    }
    return userService.delete(id);
  },
};
