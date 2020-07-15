import admin from "firebase-admin";

function checkEmailReply(email) {
  return new Promise((resolve) => {
    admin
      .database()
      .ref("/users/")
      .once("value")
      .then((snap) => {
        var child = snap.val();
        Object.values(child).map((item) => {
          if (item.email === email) {
            return resolve("true");
          }
        });
        return resolve("false");
      });
  });
}

export default checkEmailReply;
