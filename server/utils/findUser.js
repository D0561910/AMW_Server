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
            userMatch(child[i]);
          }
          console.log(`${i}: ${child[i].id}`);
          console.log(`${i}: ${child[i].name}`);
          console.log(`${i}: ${child[i].email}`);
          console.log(`${i}: ${child[i].password}`);
        }
      });
  });
}

export default findUser;
