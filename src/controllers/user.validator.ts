import { ServerError } from "../errors";
import { CreateUserDto } from "../types";

export function isValidCreateUserDto(data: unknown): data is CreateUserDto {
  if (typeof data !== "object" || data === null)
    throw new ServerError("Not valid body", 402);

  const dto = data as Record<string, unknown>;
  if (
    typeof dto.username !== "string" ||
    typeof dto.age !== "number" ||
    !Array.isArray(dto.hobbies)
  )
    throw new ServerError("Not valid body", 402);

  if (!dto.hobbies.every((hobby) => typeof hobby === "string"))
    throw new ServerError("Not valid body", 402);

  return true;
}
