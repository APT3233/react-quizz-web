import express from "express";
const router = express.Router();

router.use("/", (req, res) => {
  res.send("res");
});

export default router;
