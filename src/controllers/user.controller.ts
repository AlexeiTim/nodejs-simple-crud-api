import { userService } from "../services/user.service";
import { validate, v4 as uuid } from "uuid";
import { ReqMeta, ReqParams } from "../types";
import { isValidCreateUserDto, isValidUpdateUserDto } from "./user.validator";
import { parseReqBody } from "../utils/readRequestBody";
import { IncomingMessage, Server, ServerResponse } from "http";
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
        return jsonResponse(res, 400, { message: "Not valid id" });
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
  update(_: IncomingMessage, res: ServerResponse, { params, body }: ReqMeta) {
    try {
      const { id } = params;
      if (typeof id !== "string" || !id || !validate(id)) {
        return jsonResponse(res, 400, { message: "Not valid id" });
      }
      if (!isValidUpdateUserDto(body)) return;
      return jsonResponse(res, 200, userService.update(id, body));
    } catch (e) {
      const error = e as ServerError;
      jsonResponse(res, error.status, error);
    }
  },
  delete(_: IncomingMessage, res: ServerResponse, { params }: ReqMeta) {
    try {
      const { id } = params;
      if (!id || typeof id !== "string" || !validate(id)) {
        return jsonResponse(res, 400, "Not valid id");
      }
      return jsonResponse(res, 204, userService.delete(id));
    } catch (e) {
      const error = e as ServerError;
      return jsonResponse(res, error.status, error);
    }
  },
};
