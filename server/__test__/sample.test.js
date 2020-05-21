import request from "supertest";
import "regenerator-runtime/runtime";
// import server from "../bin/www";
import server from "../app";
import admin from "../config/firebase.config";

const TEST_EMAIL = "Ronald@gmail.com";
const TEST_PASSWORD = "123456aaccd";
const TEST_USERNAME = "Donald Duch";

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
    const res = await request(server).post("/api/login").send({ email: "abc", password: "1234567" });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// ==========================================================================================================================

// @Test '/signup' route with true type email, username and password;
describe("Sign Up test 1", () => {
  it("Sign Up API with new email, username and password", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: TEST_USERNAME,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/signup' route with same email, username and password;
describe("Sign Up test 2", () => {
  it("Sign Up API with same email, username and password", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      name: TEST_USERNAME,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errormsg");
    done();
  });
});

// @Test '/signup' route with error type;
describe("Sign Up test 3", () => {
  it("Sign Up API with error type", async (done) => {
    const res = await request(server)
      .post("/api/signup")
      .send({ email: "tester@", password: "12345", names: "Test" });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/signup' route with empty body;
describe("Sign Up test 4", () => {
  it("Sign Up API with empty body", async (done) => {
    const res = await request(server).post("/api/signup").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test unknow route
describe("Get Unknow Route", () => {
  it("Get Unknow Route", async (done) => {
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
