import admin from "../config/firebase.config";
const vaildRequest = async (email, projectid) => {
  return await admin
    .database()
    .ref("/projects")
    .once("value")
    .then((snap) => {
      var child = snap.val();
      for (let i in child) {
        if (child[i].projectId === projectid && child[i].creator === email) {
          return true;
        }
      }
      return false;
    });
};

export default vaildRequest;
