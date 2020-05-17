import request from "supertest";
import "regenerator-runtime/runtime";
import server from "../app";

var TOKEN = "";
var PROJECTID = "";
const PROJECTNAME = "Unit-Testing";
const EMAIL = "test@gmail.com";

beforeAll(async () => {
  const loginResult = await request(server)
    .post("/api/login")
    .send({ email: "test@gmail.com", password: "123456" });
  TOKEN = loginResult.body.token;
  console.log("1 - beforeAll");
});

// @Test '/api/event/create' route with parameters;
describe("Post Create New Project", () => {
  it("Create New Event Project", async (done) => {
    const res = await request(server).post("/api/event/create").send({
      project: PROJECTNAME,
      token: TOKEN,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/api/projets' route with parameters;
describe("Post get all project create by user", () => {
  it("Request user project", async (done) => {
    const res = await request(server).post("/api/projets").send({
      email: EMAIL,
      token: TOKEN,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    PROJECTID = res.body.data[0].projectId;
    done();
  });
});

// @Test '/api/project/overview' route with parameters;
describe("Get Dashboard Data", () => {
  it("Request Basic Event Infomation", async (done) => {
    const res = await request(server).post("/api/project/overview").send({
      projectid: PROJECTID,
      token: TOKEN,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
});

// @Test '/api/project/overview' route project ID and token not match;
describe("Get Dashboard Data", () => {
  it("Request Basic Event Infomation", async (done) => {
    const loginResult = await request(server)
      .post("/api/login")
      .send({ email: "test2@gmail.com", password: "123456" });
    const res = await request(server).post("/api/project/overview").send({
      projectid: PROJECTID,
      token: loginResult.body.token,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errmsg");
    done();
  });
});

// @Test '/api/totalUserAccess' route with parameters;
describe("API Get Participants", () => {
  it("Request Total Num of Participants", async (done) => {
    const res = await request(server).post("/api/totalUserAccess").send({
      projectid: PROJECTID,
      token: TOKEN,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
});

// @Test '/api/updateEventInfo' route update all event information;
describe("Update Basic Event Information", () => {
  it("Update Basic Event Information", async (done) => {
    const res = await request(server).post("/api/updateEventInfo").send({
      projectid: PROJECTID,
      token: TOKEN,
      endDate: `2020-06-21`,
      eventAuthor: `Jolin Tsai`,
      eventLocation: `Starbuck Feng Chia`,
      eventName: `StarBucks Coffee`,
      event_deatils: `Enjoy buy one Free one`,
      startDate: `2020-06-20`,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/api/updateEventInfo' route update information only;
describe("Update Basic Event Information", () => {
  it("Update Basic Event Information", async (done) => {
    const res = await request(server).post("/api/updateEventInfo").send({
      projectid: PROJECTID,
      token: TOKEN,
      endDate: `2020-06-21`,
      eventAuthor: `David Tsai`,
      eventLocation: `Carrefoure`,
      eventName: `StarBucks Coffee`,
      event_deatils: `Enjoy buy one Free one`,
      startDate: `2020-06-20`,
    });
    expect(res.statusCode).toEqual(202);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/api/project/remove' route with parameters;
describe("Remove Project", () => {
  it("Remove Project", async (done) => {
    const res = await request(server).post("/api/project/remove").send({
      projectid: PROJECTID,
      token: TOKEN,
      projectname: PROJECTNAME,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/api/project/remove' route project ID and token not match;
describe("Remove Project", () => {
  it("Remove Project", async (done) => {
    const loginResult = await request(server)
      .post("/api/login")
      .send({ email: "test2@gmail.com", password: "123456" });
    const res = await request(server).post("/api/project/remove").send({
      projectid: PROJECTID,
      token: loginResult.body.token,
      projectname: PROJECTNAME,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errmsg");
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  // server.close();
  done();
});
