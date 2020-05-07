import "regenerator-runtime/runtime";
import bcrypt from "bcrypt";
import admin from "../config/firebase.config";

function findUser(name, password) {
  return new Promise((resolve, reject) => {
    admin
      .database()
      .ref("users/")
      .once("value")
      .then((snap) => {
        function userMatch(userItem) {
          bcrypt.compare(password, userItem.password).then((result) => {
            if (result && userItem.name === name) {
              return resolve();
            } else {
              return reject();
            }
          });
        }
        snap.forEach(async function (childSnapshot) {
          var childObject = await childSnapshot.val();
          userMatch(childObject);
        });
      });
  });
}

export default findUser;

// const userPromise = new Promise((resolve, reject) => {
//     admin
//       .database()
//       .ref("users/")
//       .once("value")
//       .then((snap) => {
//         snap.forEach((childSnapshot) => {
//           var childObject = childSnapshot.val();
//           var vaild = childObject.name === name;
//           // console.log(vaild);
//           if (vaild) {
//             bcrypt.compare(password, childObject.password).then((result) => {
//               if (result) {
//                 resolve("done");
//               } else {
//                 reject(new APPError.LoginError1());
//               }
//             });
//           }
//           reject("error");
//         });

//       });
//   });
