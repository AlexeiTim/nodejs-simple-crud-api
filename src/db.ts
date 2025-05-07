import { User } from "./types";

interface DB {
  users: User[];
}

export const DATA_BASE: DB = {
  users: [
    {
      id: "065cfff8-2962-41af-a3d4-880c73539611",
      username: "hello",
      age: 5,
      hobbies: ["1"],
    },
    {
      id: "7559bbd1-bf78-419f-ba81-e87f8f17b77c",
      username: "hello",
      age: 5,
      hobbies: ["1"],
    },
    {
      id: "5eb410e3-bbd4-46ae-af04-85cc3f58102f",
      username: "hello",
      age: 5,
      hobbies: ["1"],
    },
  ],
};
