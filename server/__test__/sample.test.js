import request from "supertest";
import "regenerator-runtime/runtime";
// import server from "../bin/www";
import server from "../app";

// @Test '/' route
describe("Get Endpoints", () => {
  it("Get root", async (done) => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome");
    done();
  });
});

// @Test '/main' route
describe("Get /main", () => {
  it("Get main API", async (done) => {
    const res = await request(server).get("/main");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
    done();
  });
});

// @Test '/users' route
describe("Get /users", () => {
  it("Get users API", async (done) => {
    const res = await request(server).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/login' route with true username and password;
describe("Post login api with true parameter", () => {
  it("Post /api/login", async (done) => {
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
  it("Post /api/login", async (done) => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "tester@gmail.com", password: "6543211" });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

// @Test '/login' route with empty body;
describe("Post login api with error", () => {
  it("Post /api/login", async (done) => {
    const res = await request(server).post("/api/login").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/signup' route with error type;
describe("Post login api with error", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server)
      .post("/api/signup")
      .send({ email: "tester@", password: "12345", names: "Test" });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/signup' route with true email, username and password;
describe("Post login api with error", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: "Ronald@gmail.com",
      password: "123456aaccd",
      name: "Donald Duch",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ret_msg");
    done();
  });
});

// @Test '/signup' route with same email, username and password;
describe("Post login api with error", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({
      email: "Ronald@gmail.com",
      password: "123456aaccd",
      name: "Donald Duch",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ret_msg");
    done();
  });
});

// @Test '/signup' route with empty body;
describe("Post login api with error", () => {
  it("Post /api/signup", async (done) => {
    const res = await request(server).post("/api/signup").send({});
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test unknow route
describe("Get Endpoints", () => {
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
