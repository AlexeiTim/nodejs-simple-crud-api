import { server } from "../main";
import request from "supertest";
import { CreateUserDto } from "../types";
import { v4 as uuid } from "uuid";

describe("test simple crud api", () => {
  describe("first simple scenario", () => {
    let userId: string;
    const TEST_USER_DTO: CreateUserDto = {
      age: 1,
      hobbies: ["1"],
      username: "test",
    };

    test("should return empty array users with status 200", async () => {
      const response = await request(server).get("/users");
      expect(response.body).toEqual([]);
      expect(response.status).toEqual(200);
    });

    test("should return new user with status 201", async () => {
      const response = await request(server).post("/users").send(TEST_USER_DTO);

      expect(response.body).toEqual({
        id: expect.any(String),
        ...TEST_USER_DTO,
      });
      expect(response.status).toEqual(201);
      userId = response.body.id;
    });

    test("should return create user with status 200", async () => {
      const response = await request(server).get(`/users/${userId}`);

      expect(response.body).toEqual({
        id: userId,
        ...TEST_USER_DTO,
      });
      expect(response.status).toEqual(200);
    });

    test("should return updated user with status 200", async () => {
      const TEST_UPDATE_DATA = {
        age: 10,
        hobbies: ["2", "4"],
        username: "!@#!@#!@#!@#",
      };
      const response = await request(server)
        .put(`/users/${userId}`)
        .send(TEST_UPDATE_DATA);

      expect(response.body).toEqual({
        id: userId,
        ...TEST_UPDATE_DATA,
      });
      expect(response.status).toEqual(200);
    });

    test("should delete create user with status 204", async () => {
      const response = await request(server).delete(`/users/${userId}`);

      expect(response.status).toEqual(204);
      expect(response.body).toEqual("");
    });

    test("should return 404 status when try get deleted user", async () => {
      const response = await request(server).get(`/users/${userId}`);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: "User not found",
        status: 404,
      });
    });
  });

  describe("second bad scenario with not valid data and params", () => {
    const TEST_BAD_USER_DATA = {
      hobbies: [1],
    };

    test("should return 400 status when create user not valid data", async () => {
      const response = await request(server)
        .post("/users")
        .send(TEST_BAD_USER_DATA);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        message: "Not valid body",
        status: 400,
      });
    });

    test("should return 400 status when update user with not valid data", async () => {
      const validResponse = await request(server).post("/users").send({
        username: "1",
        age: 1,
        hobbies: [],
      });

      const response = await request(server)
        .put(`/users/${validResponse.body.id}`)
        .send(TEST_BAD_USER_DATA);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        message: "Not valid body",
        status: 400,
      });
    });

    test("should reutnr 400 status when try get user with not valid uuid", async () => {
      const response = await request(server).get("/users/1");

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        message: "Not valid id",
      });
    });
  });

  describe("third scenario with not found cases", () => {
    const TEST_UUID = uuid();

    test("should return 404 when try get not exists user", async () => {
      const response = await request(server).get(`/users/${TEST_UUID}`);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: "User not found",
        status: 404,
      });
    });

    test("should reutnr 404 status when try delete not exists user", async () => {
      const response = await request(server).delete(`/users/${TEST_UUID}`);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: "User not exists",
        status: 404,
      });
    });

    test("should return 404 status when try update not exists user", async () => {
      const response = await request(server)
        .put(`/users/${TEST_UUID}`)
        .send({ hobbies: ["1"], username: "123", age: 1 });

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: "User not found",
        status: 404,
      });
    });

    test("should reutnr 404 when try call unexists api endpoint", async () => {
      const response = await request(server).get("/123123");

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: "Endpoint not exists",
      });
    });
  });
});
