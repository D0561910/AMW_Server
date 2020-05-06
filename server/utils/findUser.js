import "regenerator-runtime/runtime";
import admin from "../config/firebase.config";

function findUser(name, password) {
  return new Promise((resolve, reject) => {
    admin
      .database()
      .ref("users/")
      .once("value")
      .then((snap) => {
        function userMatch(userItem) {
          if (userItem.name === name && userItem.password === password
          ) {
            return resolve();
          }
        }
        snap.forEach(function (childSnapshot) {
          var childObject = childSnapshot.val();
          userMatch(childObject);
        });
        return reject();
      });
  });
}

export default findUser;
