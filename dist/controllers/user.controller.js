"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const uuid_1 = require("uuid");
const user_validator_1 = require("./user.validator");
const jsonResponse_1 = require("../utils/jsonResponse");
exports.userController = {
    findAll(_, res) {
        try {
            return (0, jsonResponse_1.jsonResponse)(res, 200, user_service_1.userService.findAll());
        }
        catch (e) {
            const error = e;
            (0, jsonResponse_1.jsonResponse)(res, error.status, error);
        }
    },
    findOne(_, res, { params }) {
        try {
            const { id } = params;
            if (!id || !(0, uuid_1.validate)(id) || typeof id !== "string") {
                return (0, jsonResponse_1.jsonResponse)(res, 400, { message: "Not valid id" });
            }
            return (0, jsonResponse_1.jsonResponse)(res, 200, user_service_1.userService.findOne(id));
        }
        catch (e) {
            const error = e;
            (0, jsonResponse_1.jsonResponse)(res, error.status, error);
        }
    },
    async create(_, res, { body }) {
        try {
            if (!(0, user_validator_1.isValidCreateUserDto)(body))
                return;
            const newUser = user_service_1.userService.create(body);
            (0, jsonResponse_1.jsonResponse)(res, 201, newUser);
        }
        catch (e) {
            const error = e;
            (0, jsonResponse_1.jsonResponse)(res, error.status, error);
        }
    },
    update(_, res, { params, body }) {
        try {
            const { id } = params;
            if (typeof id !== "string" || !id || !(0, uuid_1.validate)(id)) {
                return (0, jsonResponse_1.jsonResponse)(res, 400, { message: "Not valid id" });
            }
            if (!(0, user_validator_1.isValidUpdateUserDto)(body))
                return;
            return (0, jsonResponse_1.jsonResponse)(res, 200, user_service_1.userService.update(id, body));
        }
        catch (e) {
            const error = e;
            (0, jsonResponse_1.jsonResponse)(res, error.status, error);
        }
    },
    delete(_, res, { params }) {
        try {
            const { id } = params;
            if (!id || typeof id !== "string" || !(0, uuid_1.validate)(id)) {
                return (0, jsonResponse_1.jsonResponse)(res, 400, "Not valid id");
            }
            return (0, jsonResponse_1.jsonResponse)(res, 204, user_service_1.userService.delete(id));
        }
        catch (e) {
            const error = e;
            return (0, jsonResponse_1.jsonResponse)(res, error.status, error);
        }
    },
};
