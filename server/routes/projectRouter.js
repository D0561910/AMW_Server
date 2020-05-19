import express from "express";
import moment from "moment";
import jwt from "jsonwebtoken";
import admin from "../config/firebase.config";
import dataInfo from "../utils/classes/dataInfo.js";
import betweenTwoDays from '../utils/betweentwodays';
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const projectRouter = express.Router();

// API: User add new project
projectRouter.post("/event/create", (req, res) => {
  var projectName = req.body.project;
  var projectID = `${projectName.split(/\s+/).join("")}-${moment.now()}`;
  var decoded = jwt.verify(req.body.token, "secretkey");

  var projectRef = admin.database().ref(`/projects`);
  var eventRef = admin.database().ref(`/event/${projectID}/information`);
  var releaseRef = admin.database().ref(`/event/${projectID}/`);

  projectRef.push({
    projectId: projectID,
    projectName,
    creator: decoded.email,
  });

  releaseRef.update({
    release: false,
  });

  eventRef.set({
    endDate: "",
    eventAuthor: "",
    eventLocation: "",
    eventName: "",
    startDate: "",
    event_deatils: "",
    creator: decoded.email,
  });

  res.status(201).json({
    msg: "Event Created",
  });
});

// API: Getting project view for management page.
projectRouter.post("/projets", (req, res) => {
  const user = jwt.verify(req.body.token, "secretkey");
  // user.email //user email address as ID

  admin
    .database()
    .ref(`/projects/`)
    .once("value")
    .then((snap) => {
      var child = snap.val();
      var projects = [];
      for (let i in child) {
        if (child[i].creator === user.email) {
          projects.push({
            projectId: child[i].projectId,
            projectName: child[i].projectName,
          });
        }
      }
      res.status(201).json({
        data: projects,
      });
    });
});

// API: Getting select project overview details.
projectRouter.post("/project/overview", async (req, res) => {
  const user = jwt.verify(req.body.token, "secretkey");
  var releaseREF = admin.database().ref(`/event/${req.body.projectid}/release`);
  const reletrip = await releaseREF.once("value").then((snap) => snap.val());

  admin
    .database()
    .ref(`/event/${req.body.projectid}/information`)
    .once("value")
    .then((snap) => {
      const child = snap.val();
      var data = new dataInfo();
      if (child.creator === user.email) {
        data.endDate = child.endDate;
        data.eventAuthor = child.eventAuthor;
        data.eventLocation = child.eventLocation;
        data.eventName = child.eventName;
        data.startDate = child.startDate;
        data.event_deatils = child.event_deatils;
        data.release = reletrip;
        res.status(201).json({
          data,
        });
      } else {
        res.status(400).json({
          errmsg: "User ID not match",
        });
      }
    });
});

// API: Get Number Of Member API
projectRouter.post("/totalUserAccess", (req, res) => {
  admin
    .database()
    .ref(`/event/${req.body.projectid}/UserList`)
    .once("value")
    .then((snap) => {
      res.status(201).json({
        data: snap.numChildren(),
      });
    });
});

// API: Update Basic Event Information && Create/Update Event Date
// @request parameters: project ID, startdate, endDate, eventAuthor, eventLocation, eventName, event_deatils, token
projectRouter.post("/updateEventInfo", validation(schemas.basicInfoSchema), async (req, res) => {
  const user = jwt.verify(req.body.token, "secretkey");
  var dateStart = moment(`${req.body.startDate}`, "YYYY-MM-DD").format("l");
  var dateEnd = moment(`${req.body.endDate}`, "YYYY-MM-DD").format("l");
  const two_Date_Log = betweenTwoDays(dateStart.valueOf(), dateEnd.valueOf());

  // Here is update event Information
  var newEvent = {};
  newEvent[`/event/${req.body.projectid}/information`] = {
    creator: `${user.email}`,
    endDate: `${req.body.endDate}`,
    eventAuthor: `${req.body.eventAuthor}`,
    eventLocation: `${req.body.eventLocation}`,
    eventName: `${req.body.eventName}`,
    event_deatils: `${req.body.event_deatils}`,
    startDate: `${req.body.startDate}`,
  }

  // Get Schedules date array
  const database_Date_Log = await admin.database().ref(`/event/${req.body.projectid}/schedules/`).once("value").then((snap) => {
    var items = snap.val();
    var array = [];
    for (let item in items) array.push(item);
    return array;
  });

  // Check that both matrices have the same date history
  if (JSON.stringify(two_Date_Log) === JSON.stringify(database_Date_Log)) {
    admin.database().ref().update(newEvent);
    res.status(202).json({ msg: "Update Basic Information Successfully" });
  } else {
    var newSchedules = {}
    two_Date_Log.forEach((date) => {
      var eachDate = moment(`${date}`, "DD-MMM-YYYY").format("DD-MMM-YYYY");
      newSchedules[`/event/${req.body.projectid}/schedules/${eachDate}`] = {
        isEmpty: true
      }
    });
    admin.database().ref().update(newEvent);
    admin.database().ref(`/event/${req.body.projectid}/schedules/`).remove();
    admin.database().ref().update(newSchedules);
    res.status(201).json({ msg: "Update Basic Information and Event Date Successfully" })
  }
});

// API: Remove Project
// @Request Parameters: Token, Project ID and Project Name
projectRouter.post("/project/remove", function (req, res) {
  const user = jwt.verify(req.body.token, "secretkey");
  admin.database().ref(`/projects`).once("value").then((snap) => {
    var child = snap.val();
    var verifyStatus = false;
    var projectKey = " ";
    for (let key in child) {
      var vaildId = req.body.projectid === child[key].projectId;
      var validName = req.body.projectname === child[key].projectName;
      var vaildUser = user.email === child[key].creator;
      if (vaildId && validName && vaildUser) {
        verifyStatus = true;
        projectKey = key;
      }
    }
    if (verifyStatus) {
      admin.database().ref(`/projects/${projectKey}`).remove();
      admin.database().ref(`/event/${req.body.projectid}`).remove();
      res.status(201).json({ msg: "Remove Successfully" });
    }
    else {
      res.status(400).json({ errmsg: "Parameters Error" });
    }
  });
});

// API: Release Status
// router.post("/getstatus", async (req, res) => {
//   // Get project id.
//   var db = firebase.database();
//   var checkInfo = db.ref(`event/${req.session.prjId}`);
//   const trip2 = await checkInfo
//     .child(`/transportImages`)
//     .once("value")
//     .then((snap) => snap.val());
//   // const trip3 = await checkInfo.child(`/sponor`).once('value').then(snap => snap.val());
//   const trip = await checkInfo
//     .child(`/information`)
//     .once("value")
//     .then((snap) => {
//       var chkInfo = snap.val();
//       var iStatus = "";
//       let end = chkInfo.endDate != "";
//       let author = chkInfo.eventAuthor != "";
//       let loc = chkInfo.eventLocation != "";
//       let logo = chkInfo.eventLogo != null;
//       let name = chkInfo.eventName != "";
//       let start = chkInfo.startDate != "";
//       if (end && author && loc && logo && name && start) {
//         iStatus = "notempty";
//       }
//       return iStatus;
//     });
//   const trip4 = await checkInfo
//     .child(`/schedules`)
//     .once("value")
//     .then((snap) => {
//       var event = snap.val();
//       var eStatus = "notEmpty";
//       for (let i in event) {
//         var keyValue = event[i];
//         for (let j in keyValue) {
//           if (j !== "empty") {
//             if (keyValue[j].empty) {
//               eStatus = "empty";
//             }
//           }
//         }
//       }
//       return eStatus;
//     });
//   var transStatus = trip2 != null;
//   var infoStatus = trip != "";
//   var eventStatus = trip4 != "empty";
//   let obj = {
//     infoStatus,
//     transStatus,
//     eventStatus,
//   };
//   res.send(obj);
// });

export default projectRouter;