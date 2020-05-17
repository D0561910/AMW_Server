import express from "express";
import moment from "moment";
import jwt from "jsonwebtoken";
import admin from "../config/firebase.config";
import dataInfo from "../utils/classes/info.module.js";
import betweenTwoDays from '../utils/betweentwodays';
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const router = express.Router();

// API: User add new project
router.post("/event/create", (req, res) => {
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
router.post("/projets", (req, res) => {
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
router.post("/project/overview", async (req, res) => {
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
router.post("/totalUserAccess", function (req, res) {
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
router.post("/updateEventInfo", validation(schemas.basicInfoSchema), async (req, res) => {

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
router.post("/project/remove", function (req, res) {

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

    console.log(req.body.projectid);
    console.log(req.body.projectname);
    console.log(user.email);
    console.log(child);
    console.log({ verifyStatus });
    console.log({ projectKey });

    if (verifyStatus) {
      admin.database().ref(`/projects/${projectKey}`).remove();
      admin.database().ref(`/event/${req.body.projectid}`).remove();
      res.status(201).json({ msg: "Remove Successfully" });
    }
    else {
      res.status(400).json({ errmsg: "Parameters Error" });
    }
  })


  // if (prjid !== prjId && prjname !== projectName) {
  //     res.redirect("/logout");
  // }
  // var db = firebase.database();
  // var rmEventRef = db.ref(`/event/${prjid}`);
  // var projectRef = db.ref(`/project`);
  // const promiseRemove = new Promise((resolve, reject) => {
  //     projectRef.on("value", function (snapshot) {
  //         var proj = snapshot.val();
  //         var key = " ";
  //         for (let i in proj) {
  //             var vaildId = prjid === proj[i].projectId;
  //             var validName = prjname === proj[i].projectName;
  //             var vaildUser = userid === proj[i].userId;
  //             if (vaildId && validName && vaildUser) {
  //                 key = i;
  //             }
  //         }
  //         resolve(key);
  //     });
  // });
  // promiseRemove.then((response) => {
  //     var rmProjectRef = projectRef.child(`/${response}`);
  //     rmEventRef.remove();
  //     rmProjectRef.remove();
  //     res.send("Remove Successful");
  // });
  // res.send("Remove Successful");
});

// // API: Uploads Logo
// router.post("/logoUpload", m.single("file"), function (req, res, next) {
//     var sess = req.session;
//     var loginUser = sess.loginUser;
//     var userEmail = sess.userEmail;
//     var prjId = sess.prjId;
//     var projectName = sess.prj;
//     var isLogined = !!loginUser;

//     var db = firebase.database();
//     var ref = db.ref(`/event/${prjId}`);
//     var imgRef = ref.child(`/information/eventLogo`);

//     if (!req.file) {
//         res.render("dashss", {
//             msg: "No File Upload",
//             isLogined: isLogined,
//             name: loginUser || "",
//             email: userEmail || "",
//             uid: sess.uid,
//             prjname: projectName || "",
//             prjId: prjId,
//         });
//     }

//     // Create a new blob in the bucket and upload the file data.
//     let newFileNames =
//         "eventLOGO" + "-" + Date.now() + path.extname(req.file.originalname);
//     const blob = bucket.file(newFileNames);

//     // Make sure to set the contentType metadata for the browser to be able
//     // to render the image instead of downloading the file (default behavior)
//     const blobStream = blob.createWriteStream({
//         metadata: {
//             contentType: req.file.mimetype,
//         },
//     });

//     blobStream.on("error", (err) => {
//         next(err);
//         return;
//     });

//     blobStream.on("finish", () => {
//         // The public URL can be used to directly access the file via HTTP.
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         imgRef.push({
//             imageUrl: publicUrl,
//         });

//         // Make the image public to the web (since we'll be displaying it in browser)
//         blob.makePublic().then(() => {
//             // Success !!!;
//             // Image uploaded to ${publicUrl};
//         });

//         res.redirect("/dashss");
//     });

//     blobStream.end(req.file.buffer);
// });

// // API: Remove Logo
// router.post("/logoRefresh", function (req, res, next) {
//     var sess = req.session;
//     // var project = sess.prjId;

//     var db = firebase.database();
//     var ref = db.ref("/event");
//     var imgData = ref.child(`/${req.body.project}/information/eventLogo`);

//     const promiseImageUrl = new Promise((resolve) => {
//         imgData.on("value", function (snapshot) {
//             var imgUri = snapshot.val();
//             var imageHtml = "";
//             for (let i in imgUri) {
//                 imageHtml +=
//                     '<div class="col-lg-6s col-md-6 col-sm-6 col-xs-6 justify-content-md-center">';
//                 imageHtml += '<img class="img-thumbnail height-150" src="';
//                 imageHtml += imgUri[i].imageUrl;
//                 imageHtml += '"';
//                 imageHtml += 'itemprop="thumbnail" alt="Logo Image" />';
//                 imageHtml +=
//                     '<button type="button" class="btn mr-1 mb-1 btn-danger btn-sm" ';
//                 imageHtml += 'name = "' + imgUri[i].imageUrl + '"';
//                 imageHtml += 'onclick = "return changeFreq(this)" > 刪除</button >';
//                 imageHtml += "</div>";
//             }
//             resolve(imageHtml);
//         });
//     });

//     promiseImageUrl.then((response) => {
//         res.send(response);
//     });
// });

// // API: Refersh Logo
// router.post("/logoDel", function (req, res, next) {
//     var fileNAME = req.body.imgUrl;
//     var delFileName = fileNAME.split("/", 5);

//     var db = firebase.database();

//     // Firebase Storage
//     var buckets = firebase.storage().bucket();

//     // Get a reference to our posts
//     var ref = db.ref(`/event/${req.body.prjid}/information/eventLogo/`);

//     const promiseGetKey = new Promise((resolve, reject) => {
//         // Get the data.
//         ref.on("value", function (snapshot) {
//             var deletedPost = snapshot.val();
//             var key = "Key Error";
//             for (let i in deletedPost) {
//                 if (req.body.imgUrl === deletedPost[i].imageUrl) {
//                     key = i;
//                 }
//             }
//             if (key !== "Key Error") {
//                 resolve(key);
//             } else {
//                 reject("Images Delete Error");
//             }
//         });
//         buckets.file(delFileName[4]).delete();
//     });

//     promiseGetKey
//         .then((response) => {
//             var deleteRef = db.ref(
//                 `/event/${req.body.prjid}/information/eventLogo/${response}`
//             );
//             deleteRef.remove();
//             res.send("Deleted Successfully");
//         })
//         .catch((error) => {
//             res.send(`${error} : Images Key Error `);
//         });
// });



// router.post("/getstatus", async function (req, res, next) {
//     // Get project id.
//     var db = firebase.database();
//     var checkInfo = db.ref(`event/${req.session.prjId}`);
//     const trip2 = await checkInfo
//         .child(`/transportImages`)
//         .once("value")
//         .then((snap) => snap.val());
//     // const trip3 = await checkInfo.child(`/sponor`).once('value').then(snap => snap.val());
//     const trip = await checkInfo
//         .child(`/information`)
//         .once("value")
//         .then((snap) => {
//             var chkInfo = snap.val();
//             var iStatus = "";
//             let end = chkInfo.endDate != "";
//             let author = chkInfo.eventAuthor != "";
//             let loc = chkInfo.eventLocation != "";
//             let logo = chkInfo.eventLogo != null;
//             let name = chkInfo.eventName != "";
//             let start = chkInfo.startDate != "";
//             if (end && author && loc && logo && name && start) {
//                 iStatus = "notempty";
//             }
//             return iStatus;
//         });
//     const trip4 = await checkInfo
//         .child(`/schedules`)
//         .once("value")
//         .then((snap) => {
//             var event = snap.val();
//             var eStatus = "notEmpty";
//             for (let i in event) {
//                 var keyValue = event[i];
//                 for (let j in keyValue) {
//                     if (j !== "empty") {
//                         if (keyValue[j].empty) {
//                             eStatus = "empty";
//                         }
//                     }
//                 }
//             }
//             return eStatus;
//         });
//     var transStatus = trip2 != null;
//     var infoStatus = trip != "";
//     var eventStatus = trip4 != "empty";
//     let obj = {
//         infoStatus,
//         transStatus,
//         eventStatus,
//     };
//     res.send(obj);
// });

export default router;
