import { User } from "./types";

interface DB {
  users: User[];
  updateDB: (data: DB) => void;
}

export const DATA_BASE: DB = {
  users: [],
  updateDB(data: DB) {
    if (!data) return;
    this.users = data.users;
  },
};
