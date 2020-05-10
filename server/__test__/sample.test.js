import request from "supertest";
import "regenerator-runtime/runtime";
// import server from "../bin/www";
import server from "../app";
import admin from "../config/firebase.config";

// @Test '/' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome");
    done();
  });
});

// @Test '/main' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/main");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
    done();
  });
});

// @Test '/users' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/login' route with true username and password;
describe("Post login api with true parameter", () => {
  it("Post", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: "123456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    done();
  });
});

// @Test '/login' route with wrong username and password;
describe("Post login api with error", () => {
  test("Post", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "tester@gmail.com", password: "6543211" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test unknow route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/mains").send();
    expect(res.statusCode).toEqual(404);
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  // server.close();
  done();
});