import { ServerError } from "../errors";
import { CreateUserDto, UpdateUserDto } from "../types";

export function isValidCreateUserDto(data: unknown): data is CreateUserDto {
  if (typeof data !== "object" || data === null)
    throw new ServerError("Not valid body", 400);

  const dto = data as Record<string, unknown>;
  if (dto.id) {
    throw new ServerError("DON'T PUSH ID!!!!", 400);
  }
  if (
    typeof dto.username !== "string" ||
    typeof dto.age !== "number" ||
    !Array.isArray(dto.hobbies)
  )
    throw new ServerError("Not valid body", 400);

  if (!dto.hobbies.every((hobby) => typeof hobby === "string"))
    throw new ServerError("Not valid body", 400);

  return true;
}

export function isValidUpdateUserDto(data: unknown): data is UpdateUserDto {
  if (typeof data !== "object" || data === null)
    throw new ServerError("Not valid body", 400);

  const dto = data as Record<string, unknown>;

  if (dto.id) {
    throw new ServerError("DON'T PUSH ID!!!!", 600);
  }
  if (
    typeof dto.username !== "string" ||
    typeof dto.age !== "number" ||
    !Array.isArray(dto.hobbies)
  )
    throw new ServerError("Not valid body", 400);

  if (!dto.hobbies.every((hobby) => typeof hobby === "string"))
    throw new ServerError("Not valid body", 400);

  return true;
}
