import { userService } from "../services/user.service";
import { validate, v4 as uuid } from "uuid";
import { ReqMeta, ReqParams } from "../types";
import { isValidCreateUserDto } from "./user.validator";
import { parseReqBody } from "../utils/readRequestBody";
import { IncomingMessage, ServerResponse } from "http";
import { jsonResponse } from "../utils/jsonResponse";
import { ServerError } from "../errors";

export const userController = {
  findAll(_: IncomingMessage, res: ServerResponse) {
    try {
      return jsonResponse(res, 200, userService.findAll());
    } catch (e) {
      const error = e as ServerError;
      jsonResponse(res, error.status, error);
    }
  },
  findOne(_: IncomingMessage, res: ServerResponse, { params }: ReqMeta) {
    try {
      const { id } = params;
      if (!id || !validate(id) || typeof id !== "string") {
        return jsonResponse(res, 405, { message: "Not valid id" });
      }
      return jsonResponse(res, 200, userService.findOne(id));
    } catch (e) {
      const error = e as ServerError;
      jsonResponse(res, error.status, error);
    }
  },
  async create(_: IncomingMessage, res: ServerResponse, { body }: ReqMeta) {
    try {
      if (!isValidCreateUserDto(body)) return;
      const newUser = userService.create(body);
      jsonResponse(res, 201, newUser);
    } catch (e) {
      const error = e as ServerError;
      jsonResponse(res, error.status, error);
    }
  },
  update(req: IncomingMessage, res: ServerResponse) {
    const id = "123";
    const dto = null;
    if (!dto) return;

    const isValidId = validate(id);
    if (!isValidId) {
      throw Error("Bad id");
    }
    return userService.update(id, dto);
  },
  delete(req: IncomingMessage, res: ServerResponse) {
    const id = "123";
    const isValidId = validate(id);
    if (!isValidId) {
      throw Error("Bad id");
    }
    return userService.delete(id);
  },
};
