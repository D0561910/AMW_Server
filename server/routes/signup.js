import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import validation from "../utils/validation";
import schemas from "../utils/schemas";
import checkEmailValidation from "../utils/checkEmailValidation"

const router = express.Router();

router.post("/signup", validation(schemas.signUpSchema), async (req, res) => {

    const reply = await checkEmailValidation(req.body.email);

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