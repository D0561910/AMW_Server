import express from "express";
import jwt from "jsonwebtoken";
import findUser from "../utils/findUser";
import validation from "../utils/validation";
import schemas from "../utils/schemas";

const router = express.Router();

router.post("/login", validation(schemas.loginSchema), async (req, res) => {
  const users = await findUser(req.body.email, req.body.password)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (users) {
    jwt.sign({ users }, "secretkey", { expiresIn: "60m" }, (err, token) => {
      res.status(200).json({
        msg: "Login Successfully",
        token,
      });
    });
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

export default router;
