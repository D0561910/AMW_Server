import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/main", (req, res, next) => {
  res.status(200).json({ title: "World" });
});

export default router;
