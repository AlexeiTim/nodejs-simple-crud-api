"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCreateUserDto = isValidCreateUserDto;
exports.isValidUpdateUserDto = isValidUpdateUserDto;
const errors_1 = require("../errors");
function isValidCreateUserDto(data) {
    if (typeof data !== "object" || data === null)
        throw new errors_1.ServerError("Not valid body", 400);
    const dto = data;
    if (dto.id) {
        throw new errors_1.ServerError("DON'T PUSH ID!!!!", 400);
    }
    if (typeof dto.username !== "string" ||
        typeof dto.age !== "number" ||
        !Array.isArray(dto.hobbies))
        throw new errors_1.ServerError("Not valid body", 400);
    if (!dto.hobbies.every((hobby) => typeof hobby === "string"))
        throw new errors_1.ServerError("Not valid body", 400);
    return true;
}
function isValidUpdateUserDto(data) {
    if (typeof data !== "object" || data === null)
        throw new errors_1.ServerError("Not valid body", 400);
    const dto = data;
    if (dto.id) {
        throw new errors_1.ServerError("DON'T PUSH ID!!!!", 600);
    }
    if (typeof dto.username !== "string" ||
        typeof dto.age !== "number" ||
        !Array.isArray(dto.hobbies))
        throw new errors_1.ServerError("Not valid body", 400);
    if (!dto.hobbies.every((hobby) => typeof hobby === "string"))
        throw new errors_1.ServerError("Not valid body", 400);
    return true;
}
