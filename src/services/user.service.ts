import { userRepository } from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../types";

export const userService = {
  findAll() {
    return userRepository.findAll();
  },
  findOne(id: string) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw Error("User not found");
    }
    return user;
  },
  create(dto: CreateUserDto) {
    return userRepository.create(dto);
  },
  update(id: string, dto: UpdateUserDto) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw Error("User not found");
    }
    return userRepository.update(id, dto);
  },
  delete(id: string) {
    const user = userRepository.findOne(id);
    if (!user) {
      throw Error("User not exists");
    }
    userRepository.delete(id);
  },
};
