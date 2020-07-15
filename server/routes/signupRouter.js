import express from "express";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import validation from "../utils/validation";
import schemas from "../utils/schemas";
import checkEmailReply from "../utils/checkEmailReply";

const signupRouter = express.Router();

signupRouter.post("/signup", validation(schemas.signUpSchema), async (req, res) => {
  const reply = await checkEmailReply(req.body.email);

  const saltRounds = 10;
  // for register new account
  if (reply === "false") {
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      admin.database().ref("users/").push({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      });
      res.status(201).json({
        msg: "Register Successfully",
      });
    });
  } else {
    res.status(400).json({
      errormsg: "E-mail Already Register try another e-mail",
    });
  }
});

export default signupRouter;
