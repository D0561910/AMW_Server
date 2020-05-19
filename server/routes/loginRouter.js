import express from "express";
import jwt from "jsonwebtoken";
import findUser from "../utils/findUser";
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const loginRouter = express.Router();

loginRouter.post("/login", validation(schemas.loginSchema), async (req, res) => {
  const users = await findUser(req.body.email, req.body.password)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (users) {
    jwt.sign({ users, email: req.body.email }, "SoftwareQualityAssurance", { expiresIn: "60m" }, (err, token) => {
      res.status(200).json({
        msg: "Login Successfully",
        token: `Bearer ${token}`
      });
    });
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

export default loginRouter;
