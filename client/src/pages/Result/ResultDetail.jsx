import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicById } from "../../Services/QuizService";
import NotiAlert from "../../utils/noti";

// UI lib
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ResultDetail() {
  const listTopic = useSelector((state) => state.topicReducer);
  const userScoreDetail = useSelector((state) => state.quizzReducer);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleRetake = () => {
    navigate(`/quizz/${id}`);
  };
  console.log("user: ", userScoreDetail);

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

  return (
    <>
      {questions.length > 0 ? (
        <div className="quizz__content--ques">
          {questions.map((question, index) => {
            var userAnswer = userScoreDetail.find(
              (item) => item.selected[question.id]
            );
            userAnswer = userAnswer.selected[question.id];
            const correctAnswer = question.correctAnswer.toString();

            return (
              <FormControl key={question.id}>
                <FormLabel id={`question-${index}`} className="question__title">
                  {question.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby={`question-${index}`}
                  name={`radio-buttons-group-${index}`}
                  required
                >
                  {question.answers.map((answer, answerIndex) => {
                    const isCorrect = answerIndex.toString() === correctAnswer;
                    const isUserAnswer = userAnswer === answerIndex.toString();
                    const labelStyle =
                      isUserAnswer && !isCorrect ? { color: "red", textDecoration: "line-through" } : {};

                    return (
                      <FormControlLabel
                        key={answerIndex}
                        value={answerIndex}
                        control={<Radio checked={isUserAnswer || isCorrect} />}
                        label={answer}
                        style={labelStyle}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            );
          })}
          <NotiAlert
            title="Quizz Status"
            message={`Score: ${userScoreDetail[0].score} - Correct: ${userScoreDetail[0].correctAns} - Incorrect: ${userScoreDetail.incorrectAns}`}
          />
          <div className="res__content--right">
            <Stack direction='row'  spacing={1}>
              <Button variant="outlined" onClick={() => handleBack()}>
                Back
              </Button>
              <Button variant="outlined" onClick={() => handleRetake()}>
                Retake
              </Button>
            </Stack>
          </div>
        </div>
      ) : (
        <p>Please select your quizz to practice.</p>
      )}
    </>
  );
}
