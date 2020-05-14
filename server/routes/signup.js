import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const router = express.Router();

function checkUser(email) {
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

router.post("/signup", validation(schemas.signUpSchema), async (req, res) => {

    const reply = await checkUser(req.body.email);

    const saltRounds = 10;
    // for register new account
    if (reply == "false") {
        bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
            // Store hash in your password DB.
            admin.database().ref("users/").push({
                email: req.body.email,
                name: req.body.name,
                password: hash
            });
            res.json({
                ret_msg: "Register Successfully"
            });
        });
    } else {
        res.json({
            ret_msg: "E-mail Already Register try another e-mail"
        });
    }
});

export default router;