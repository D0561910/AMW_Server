import express from "express";
const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  res.status(200).json({
    msg: "respond with a resource"
  });
});

export default usersRouter;