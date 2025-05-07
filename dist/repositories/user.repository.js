"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
exports.userRepository = {
    findAll() {
        return db_1.DATA_BASE.users;
    },
    findOne(id) {
        return db_1.DATA_BASE.users.find((user) => user.id === id);
    },
    create(dto) {
        const id = (0, uuid_1.v4)();
        const newUser = {
            id,
            ...dto,
        };
        db_1.DATA_BASE.users.push(newUser);
        return newUser;
    },
    update(id, dto) {
        const userIndex = db_1.DATA_BASE.users.findIndex((user) => user.id === id);
        const updatedUser = {
            id,
            ...dto,
        };
        db_1.DATA_BASE.users[userIndex] = updatedUser;
        return updatedUser;
    },
    delete(id) {
        db_1.DATA_BASE.users = db_1.DATA_BASE.users.filter((user) => user.id !== id);
    },
};
