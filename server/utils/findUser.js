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
        var notfound = true
        function userMatch(userItem) {
          bcrypt.compare(password, userItem.password).then((result) => {
            if (result) {
              if (userItem.name === name) {
                return resolve();
              } else {
                return reject();
              }
            }
          });
        }

        var child = snap.val()
        for (let i in child) {
          if (child[i].name === name) {
            notfound = false;
            userMatch(child[i]);
          }
        }
        // this statement is for check found user or not.
        if (notfound) {
          return reject();
        }
      });
  });
}

export default findUser;