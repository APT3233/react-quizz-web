import core from "../../core.js";
import jwt from 'jsonwebtoken'
import express from "express";
import user from "../../model/user.js";
const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  user.authUser(username, password, (data) => {

    const token = jwt.sign({ username, password}, core.app_token, { expiresIn: '1h'})
    if (data) {
      console.log('-------------------- Data Post: ---------------------\n',
                  'id: ', data.id,
                  'token: ', token
      )
      res
        // .cookie('user_token', token, { path: '/', maxAge: 3600000, httpOnly: true})
        .status(200)
        .json({
          message: "Login Success",
          ok: true,
          status: 200,
          id: data.id,
          token: token,
        });
    } else {
      res.status(400).json({ ok: false, message: "Login Failed", status: 400 });
    }
  });
});

export default router;
