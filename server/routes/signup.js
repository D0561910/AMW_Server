import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";

const router = express.Router();

router.post("/signup", async (req, res) => {
    // const vaild = emailVaild(req.body.email);

    const saltRounds = 10;
    // for register new account
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        // Store hash in your password DB.
        console.log(`admin ${hash}`);
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