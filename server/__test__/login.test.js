import request from "supertest";
import "regenerator-runtime/runtime";
import server from "../app";

const TRUEPASS = "123456";
const ERRORPASS = "6543211"

// @Test '/login' route with true email and password;
describe("login test 1", () => {
  it("Login API with true email and password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: TRUEPASS });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toHaveProperty("token");
    done();
  });
});

// @Test '/login' route with wrong email and password;
describe("login test 2", () => {
  it("Login API with wrong email and password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "tester@gmail.com", password: ERRORPASS });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({ error: "Forbidden" });
    done();
  });
});

// @Test '/login' route with true email, but wrong password;
describe("login test 3", () => {
  it("Login API with true email, but wrong password", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: ERRORPASS });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toEqual({ error: "Forbidden" });
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
      .send({ email: "abc", password: ERRORPASS });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});
