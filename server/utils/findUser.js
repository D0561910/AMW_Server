import "regenerator-runtime/runtime";
import bcrypt from "bcrypt";
import admin from "../config/firebase.config";
import userMatch from "./userMatch";

function findUser(email, password) {
  return new Promise((resolve, reject) => {
    admin
      .database()
      .ref("users/")
      .once("value")
      .then((snap) => {
        var notfound = true;
        var child = snap.val();
        for (let i in child) {
          if (child[i].email == email) {
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
