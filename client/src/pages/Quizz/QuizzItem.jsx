import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicById } from "../../Services/QuizService";
import "./Quizz.css";

// UI lib
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// UI btn lib
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import NotiAlert from "../../utils/noti";

const getNameById = (id, listTopic) => {
  const topic = listTopic.find((item) => item.id === parseInt(id));
  return topic ? topic.name : "";
};

export default function QuizzItem() {
  const listTopic = useSelector((state) => state.topicReducer);
  const [questions, setQuestions] = useState([]);
  const [select, setSelect] = useState({});
  const [error, setError] = useState(false);
  const [point, setPoint] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const topicQuizz = async () => {
      const topicSelect = listTopic.find((item) => item.id === parseInt(id));
      if (topicSelect) {
        const response = await getTopicById(id);
        setQuestions(response);
      }
    };

    topicQuizz();
  }, [id, listTopic]);

  const handleChange = useCallback((e, id) => {
    const val = e.target.value;
    setSelect((prevSelect) => ({
      ...prevSelect,
      [id]: val,
    }));
  }, []);
  const handleClear = useCallback(() => {
    setSelect({});
    setError(false);
    setIsSubmit(false);
  }, []);
  const handleView = (id) => navigate(`/result`);

  const handleSubmit = useCallback(() => {
    var score = 0;
    var correctAns = 0;
    var incorrectAns = 0;
    const CorrectAns = {};
    const InCorrectAns = {};
    const selected = {};
    const totalQues = Object.keys(select).length;
    if (totalQues < questions.length) {
      setError(true);
      return;
    }
    setError(false);
    const scoreByOne = 10 / totalQues;
    questions.forEach((question) => {
      if (select[question.id] === question.correctAnswer.toString()) {
        score += scoreByOne;
        correctAns += 1;
        CorrectAns[question.id] = question.correctAnswer;
      } else {
        incorrectAns++;
        InCorrectAns[question.id] = select[question.id];
      }
      selected[question.id] = select[question.id];
    });
    setPoint({
      score: score.toFixed(2),
      correctAns: correctAns,
      incorrectAns: totalQues - correctAns,
    });
    setIsSubmit(true);
    console.log(
      "Post Store: ",
      dispatch({
        type: "SET_POINT",
        idTopic: id,
        name: getNameById(id, listTopic),
        score: score.toFixed(2),
        correctAns: correctAns,
        incorrectAns: incorrectAns,
        CorrectAns: CorrectAns,
        InCorrectAns: InCorrectAns,
        selected: selected,
      })
    );
  }, [id, select, questions, dispatch]);

  return (
    <>
      {questions.length > 0 ? (
        <div className="quizz__content--ques">
          {questions.map((question, index) => (
            <FormControl key={question.id}>
              <FormLabel id={`question-${index}`} className="question__title">
                {question.question}
              </FormLabel>
              <RadioGroup
                aria-labelledby={`question-${index}`}
                name={`radio-buttons-group-${index}`}
                value={select[question.id] || ""}
                onChange={(e) => handleChange(e, question.id)}
                required
              >
                {question.answers.map((answer, answerIndex) => (
                  <FormControlLabel
                    key={answerIndex}
                    value={answerIndex}
                    control={<Radio />}
                    label={answer}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}
          <Stack direction="row" spacing={3} className="btn__action">
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {isSubmit && (
              <Button variant="text" onClick={handleView}>
                View
              </Button>
            )}
          </Stack>
          {error ? (
            <NotiAlert
              title="Submit Failed !"
              message="Please fill in all information"
              type="error"
            />
          ) : (
            isSubmit && (
              <NotiAlert
                title="Submit Success"
                message={`Score: ${point.score} - Correct: ${point.correctAns} - Incorrect: ${point.incorrectAns}`}
              />
            )
          )}
        </div>
      ) : (
        <p>Please select your quizz to practice.</p>
      )}
    </>
  );
}
