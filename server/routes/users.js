import express from "express";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  resstatus(200).json({ msg: "respond with a resource" });
});

export default router;
