import request from "supertest";
import "regenerator-runtime/runtime";
import moment from "moment";
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
describe("Post get all project", () => {
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

// @Test '/api/project/overview' route with project ID and user token;
describe("Get Dashboard Data 1", () => {
  it("Request Basic Event Infomation with project ID and user token", async (done) => {
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

// @Test '/api/project/overview' route project ID and error user token;
describe("Get Dashboard Data 2", () => {
  it("Request Basic Event Infomation with project ID and error user token", async (done) => {
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

// @Test '/api/updateEventInfo' route create basic event information;
describe("Create Basic Event Info", () => {
  it("Create Basic Event Information ", async (done) => {
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
describe("Update Basic Event Info 1", () => {
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
describe("Update Basic Event Info 2", () => {
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
describe("Update Basic Event Info 3", () => {
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
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild days;
describe("Update Basic Event Info 4", () => {
  it("Update Invaild days", async (done) => {
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `2020-06-02`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `2020-06-00`,
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild start days;
describe("Update Basic Event Info 5", () => {
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
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/api/updateEventInfo' route Invaild start days;
describe("Update Basic Event Info 6", () => {
  it("Update Invaild days", async (done) => {
    var new_date = moment();
    var day = new_date.format("DD");
    var month = new_date.format("MM");
    var year = new_date.format("YYYY");
    var today = year + "-" + month + "-" + day;
    const res = await request(server)
      .post("/api/updateEventInfo")
      .set("authorization", `${TOKEN}`)
      .send({
        projectid: PROJECTID,
        endDate: `${today}`,
        eventAuthor: `David Tsai`,
        eventLocation: `Carrefoure`,
        eventName: `StarBucks Coffee`,
        event_deatils: `Enjoy buy one Free one`,
        startDate: `${today}`,
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("typeError");
    done();
  });
});

// @Test '/api/project/remove' route with correct token, project ID and project name;
describe("Remove Project 1", () => {
  it("Remove Project with correct token, project ID and project name", async (done) => {
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

// @Test '/api/project/remove' route with correct project ID and project name but invaild token;
describe("Remove Project 2", () => {
  it("Remove Project with correct project ID and project name but invaild token", async (done) => {
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

// @Test '/api/project/remove' route with correct project ID and project name but without token;
describe("Remove Project 3", () => {
  it("Remove Project with correct project ID and project name but without token", async (done) => {
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
