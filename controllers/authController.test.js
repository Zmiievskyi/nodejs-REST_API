/* eslint-disable no-undef */
const request = require("supertest");
const { app } = require("../app");
const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const mUser = {
  name: "Markus",
  email: "Markus2@mail.com",
  password: "123456",
};

const { DB_HOST_TEST, PORT } = process.env;

describe("test signup controller", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());
  beforeEach(() => mongoose.connect(DB_HOST_TEST));
  afterEach(() =>
    mongoose.disconnect()
  );
  test("test add user", async () => {
    const response = await request(server).post("/api/auth/signup").send(mUser);
    expect(response.statusCode).toBe(200);
    const { user } = response.body.RequestBody;
    expect(user.email).toBeTruthy();
    expect(user.password).toBeTruthy();
    expect(typeof user.email).toBe("string");
    expect(typeof user.password).toBe("string");
  });
});
