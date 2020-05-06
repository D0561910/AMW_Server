import request from "supertest";
import "regenerator-runtime/runtime";
import server from "../bin/www";

// @Test '/' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome");
    done();
  });
});

// @Test '/main' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/main").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
    done();
  });
});

// @Test '/@Test' route
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/users").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// Check error page
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/mains").send();
    expect(res.statusCode).toEqual(404);
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  server.close();
  done();
});
