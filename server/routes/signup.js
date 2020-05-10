import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const router = express.Router();

router.post("/signup", validation(schemas.signUpSchema), async (req, res) => {

    const saltRounds = 10;
    // for register new account
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        // Store hash in your password DB.
        admin.database().ref("users/").push({
            email: req.body.email,
            id: Math.ceil(Math.random() * 9999999),
            name: req.body.name,
            password: hash
        });
        res.json({
            ret_msg: "注册成功"
        });
    });

});

export default router;