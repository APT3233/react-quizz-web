import express from "express";
const router = express.Router();

router.get("/@:username", (req, res) => {
  const user = req.params.username;
  console.log(req.params)
  res.status(200).json({message: `${user}`})
});

export default router;