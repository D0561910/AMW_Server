import admin from "firebase-admin";

function checkEmailValidation(email) {
    return new Promise((resolve) => {
        admin
            .database()
            .ref("/users/")
            .once("value")
            .then((snap) => {
                var child = snap.val()
                for (let i in child) {
                    if (child[i].email == email) {
                        return resolve("true");
                    }
                }
                return resolve("false");
            });
    });
}

export default checkEmailValidation;
