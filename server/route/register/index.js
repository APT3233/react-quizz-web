import core from "../../core.js";
import jwt from "jsonwebtoken";
import user from "../../model/user.js";
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { email, username, password } = req.body;
  user.regUser({ email, username, password }, (apt) => {
    const token = jwt.sign({ username, password }, core.app_token, {
      expiresIn: "1h",
    });
    if (apt.success) {
      // res.cookie('user_token', token, { maxAge: 3600000, httpOnly: true, path: '/'})
      res
        .status(200)
        .json({
          ok: true,
          message: "Register successfully.",
          status: 200,
          id: apt.id,
          token: token,
        });
    } else
      res
        .status(400)
        .json({ ok: false, message: "Register failed", status: 400 });
  });
});

export default router;
