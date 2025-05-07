"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const user_repository_1 = require("../repositories/user.repository");
exports.userService = {
    findAll() {
        return user_repository_1.userRepository.findAll();
    },
    findOne(id) {
        const user = user_repository_1.userRepository.findOne(id);
        if (!user) {
            throw new errors_1.ServerError("User not found", 404);
        }
        return user;
    },
    create(dto) {
        return user_repository_1.userRepository.create(dto);
    },
    update(id, dto) {
        const user = user_repository_1.userRepository.findOne(id);
        if (!user) {
            throw new errors_1.ServerError("User not found", 404);
        }
        return user_repository_1.userRepository.update(id, dto);
    },
    delete(id) {
        const user = user_repository_1.userRepository.findOne(id);
        if (!user) {
            throw new errors_1.ServerError("User not exists", 404);
        }
        user_repository_1.userRepository.delete(id);
        return "success";
    },
};
