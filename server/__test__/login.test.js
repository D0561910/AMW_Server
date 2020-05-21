import request from "supertest";
import "regenerator-runtime/runtime";
import server from "../app";

// @Test '/login' route with true email and password;
describe("login test 1", () => {
  it("Login API with true email and password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: "123456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    done();
  });
});

// @Test '/login' route with wrong email and password;
describe("login test 2", () => {
  it("Login API with wrong email and password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "tester@gmail.com", password: "6543211" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test '/login' route with true email, but wrong password;
describe("login test 3", () => {
  it("Login API with true email, but wrong password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: "123456aaccd" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test '/login' route with empty body;
describe("login test 4", () => {
  it("Login API with empty body", async (done) => {
    const res = await request(server).post("/api/login").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/login' route with error email;
describe("login test 5", () => {
  it("Login API with error email", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "abc", password: "1234567" });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  // server.close();
  done();
});
