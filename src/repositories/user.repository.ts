import { DATA_BASE } from "../db";
import { CreateUserDto, UpdateUserDto } from "../types";
import { v4 as uuid } from "uuid";

export const userRepository = {
  findAll() {
    return DATA_BASE.users;
  },
  findOne(id: string) {
    return DATA_BASE.users.find((user) => user.id === id);
  },
  create(dto: CreateUserDto) {
    const id = uuid();
    const newUser = {
      id,
      ...dto,
    };
    DATA_BASE.users.push(newUser);
    return newUser;
  },
  update(id: string, dto: UpdateUserDto) {
    const userIndex = DATA_BASE.users.findIndex((user) => user.id === id);
    const updatedUser = {
      id,
      ...dto,
    };
    DATA_BASE.users[userIndex] = updatedUser;
    return updatedUser;
  },
  delete(id: string) {
    DATA_BASE.users = DATA_BASE.users.filter((user) => user.id !== id);
  },
};
