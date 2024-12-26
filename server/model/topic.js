import apt from "../connector/main.js";


const getAllTopic = (callbackFn) => apt.query("SELECT * FROM topic").then(callbackFn)

const getQuestionByTopicId = (id, callbackFn) => {

  return apt.query('SELECT * FROM question WHERE topicId = ?', [id])
        .then((queRes) => {
          console.log(queRes)
          callbackFn(queRes ? queRes : undefined)
        })
        .catch((err) => {
          callbackFn(undefined)
        })
        
}
export default{
  getAllTopic,
  getQuestionByTopicId
}