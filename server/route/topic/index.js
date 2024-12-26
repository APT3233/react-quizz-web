import express from "express";
import topic from "../../model/topic.js";
const router = express.Router();

router.get("/", (req, res) => {
  topic
    .getAllTopic()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "[-] Topic - Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  const {id} = req.params
  topic.getQuestionByTopicId(id, (data) => {
    if(data)  res.status(200).json(data)
    else  res.status(500).json({message: 'Server not response for bạn'})
  })

});

export default router;
