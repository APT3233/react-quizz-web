import RouterQuizz from "./quizz/index.js";
import RouterResult from "./result/index.js"
import RouterTopic from "./topic/index.js"
import RouterLogin from "./login/index.js"
import RouterRegister from './register/index.js';
import express from "express";
const router = express.Router();

router.use("/quizz", RouterQuizz);
router.use('/result', RouterResult)
router.use('/topic', RouterTopic)
router.use("/auth/login", RouterLogin)
router.use("/auth/register", RouterRegister)

export default router;
