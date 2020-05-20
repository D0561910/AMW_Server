import request from "supertest";
import "regenerator-runtime/runtime";
import server from "../app";

var TOKEN = "";
var PROJECTID = "";
const PROJECTNAME = "Unit-Testing";
const EMAIL = "test@gmail.com";
const INVAILDTOKEN = "";

beforeAll(async () => {
  const loginResult = await request(server)
    .post("/api/login")
    .send({ email: "test@gmail.com", password: "123456" });
  TOKEN = loginResult.body.token;
  // console.log("1 - beforeAll - project.test.js");
});

// @Test '/api/event/create' route with parameters;
describe("Post Create New Project", () => {
  it("Create New Event Project", async (done) => {
    const res = await request(server)
      .post("/api/event/create")
      .set("authorization", `${TOKEN}`)
      .send({
        project: PROJECTNAME,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg");
    done();
  });
});

// @Test '/api/projets' route with parameters;
describe("Post get all project create by user", () => {
  it("Request user project", async (done) => {
    const res = await request(server)
      .post("/api/projets")
      .set("authorization", `${TOKEN}`)
      .send({
        email: EMAIL,
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
    const res = await request(server)
      .post("/api/project/overview")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
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
    const res = await request(server)
      .post("/api/project/overview")
      .set("authorization", `${loginResult.body.token}`)
      .send({
        projectid: PROJECTID,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errmsg");
    done();
  });
});

// @Test '/api/totalUserAccess' route with parameters;
describe("API Get Participants", () => {
  it("Request Total Num of Participants", async (done) => {
    const res = await request(server)
      .post("/api/totalUserAccess")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
});

// @Test '/api/updateEventInfo' route update all event information;
describe("Update Basic Event Information", () => {
  it("Update Basic Event Information", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
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
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
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

// @Test '/api/updateEventInfo' route start date and end date are greater than 7 days;
describe("Seminar Event Start Date and End Date are greater than 7 days", () => {
  it("Start Date and End Date are greater than 7 days", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `2020-06-30`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `2020-06-20`,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errmsg");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild days;
describe("Update Invaild days", () => {
  it("Update Invaild days", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `2020-06-32`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `2020-06-20`,
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild days;
describe("Update Invaild days", () => {
  it("Update Invaild days", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `2020-06-32`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `2020-06-20`,
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild start days;
describe("Update Invaild days", () => {
  it("Update Invaild days", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `2020-01-03`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `2020-01-01`,
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// @Test '/api/project/remove' route with parameters;
describe("Remove Project", () => {
  it("Remove Project", async (done) => {
    const res = await request(server)
      .post("/api/project/remove")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
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
    const res = await request(server)
      .post("/api/project/remove")
      .set("authorization", `${loginResult.body.token}`)
      .send({
        projectid: PROJECTID,
        projectname: PROJECTNAME,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errmsg");
    done();
  });
});

// @Test '/api/project/remove' route project ID and without token;
describe("Remove Project", () => {
  it("Remove Project", async (done) => {
    const loginResult = await request(server)
      .post("/api/login")
      .send({ email: "test2@gmail.com", password: "123456" });
    const res = await request(server).post("/api/project/remove").send({
      projectid: PROJECTID,
      projectname: PROJECTNAME,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("error");
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  // server.close();
  done();
});
