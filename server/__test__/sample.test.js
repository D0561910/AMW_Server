import request from "supertest";
import "regenerator-runtime/runtime";
// import server from "../bin/www";
import server from "../app";
import admin from "../config/firebase.config";

const TEST_EMAIL = "Ronald@gmail.com";
const TEST_PASSWORD = "123456aaccd";
const TEST_USERNAME = "Donald Duch";

// @Test '/login' route with true email and password;
describe("Post Login API with true email and password", () => {
  it("Post /api/login", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: "123456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    done();
  });
});

// @Test '/login' route with wrong email and password;
describe("Post Login API with wrong email and password", () => {
  it("Post /api/login", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "tester@gmail.com", password: "6543211" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test '/login' route with true email, but wrong password;
describe("Post Login API with true email, but wrong password", () => {
  it("Post /api/login", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "test@gmail.com", password: "123456aaccd" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test '/login' route with empty body;
describe("Post Login API with empty body", () => {
  it("Post /api/login", async (done) => {
    const res = await request(server).post("/api/login").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// ==========================================================================================================================

// @Test '/signup' route with error type;
describe("Post Sign Up API with error type", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server)
      .post("/api/signup")
      .send({ email: "tester@", password: "12345", names: "Test" });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/signup' route with true type email, username and password;
describe("Post Sign Up API with new email, username and password", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: TEST_USERNAME,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ret_msg");
    done();
  });
});

// @Test '/signup' route with same email, username and password;
describe("Post Sign Up API with same email, username and password", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: TEST_USERNAME,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ret_msg");
    done();
  });
});

// @Test '/signup' route with empty body;
describe("Post Sign Up API with empty body", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test unknow route
describe("Get Unknow Route", () => {
  it("Get /mains", async (done) => {
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
