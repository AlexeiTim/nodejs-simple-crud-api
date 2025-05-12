export type UserHobby = string;

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: UserHobby[];
}

export interface CreateUserDto {
  username: string;
  age: number;
  hobbies: UserHobby[];
}

export interface UpdateUserDto extends CreateUserDto {}

export type ReqParams = Record<string, unknown>;
export interface ReqMeta {
  params: ReqParams;
  body: unknown;
}
