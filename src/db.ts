import { User } from "./types";

interface DB {
  users: User[];
}

export const DATA_BASE: DB = {
  users: [],
};
