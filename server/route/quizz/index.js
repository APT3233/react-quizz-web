import express from "express";

const router = express.Router();

router.use("/", (req, res) => {
  res.send("quizz");
});

export default router;