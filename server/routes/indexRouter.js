import express from "express";

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/main", (req, res, next) => {
  res.status(200).json({
    title: "World"
  });
});

export default indexRouter;