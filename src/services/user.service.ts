import { ServerError } from "../errors";
import { userRepository } from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../types";

export const userService = {
  findAll() {
    return userRepository.findAll();
  },
  findOne(id: string) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw new ServerError("User not found", 404);
    }
    return user;
  },
  create(dto: CreateUserDto) {
    return userRepository.create(dto);
  },
  update(id: string, dto: UpdateUserDto) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw new ServerError("User not found", 404);
    }
    return userRepository.update(id, dto);
  },
  delete(id: string) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw new ServerError("User not exists", 404);
    }
    userRepository.delete(id);
    return "success";
  },
};
