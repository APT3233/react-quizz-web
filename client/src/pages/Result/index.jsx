import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./result.css";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [answers, setAnswers] = useState([]);
  const listAns = useSelector((state) => state.quizzReducer);
  const navigate = useNavigate()
  const handleRetake = (id) => {
    navigate(`/quizz/${id}`);
  };
  const handleView = (id) => {
    navigate(`/result/${id}`)
  }
  useEffect(() => {
    setAnswers(listAns);
  }, [listAns]);

  console.log(answers);
  return (
    <>
      <div className="result__content">
        <div className="container__res">
          {answers.map((item, index) => (
            <div className="res__item" key={index}>
              <div className="res__content--left">
                <h2 className="res__item--tile">{item.name}</h2>
                <div className="content__left--detail">
                  <i>
                    idTopic: <h4>{item.idTopic}</h4>
                  </i>
                  <br />
                  <i>
                    Score: <h4>{item.score}</h4>
                  </i>
                  <br />
                  <i>
                    Correct: <h4>{item.correctAns}</h4>
                  </i>
                  <br />
                </div>
              </div>
              <div className="res__content--right">
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={()=>handleView(item.idTopic)}>View</Button>
                  <Button variant="outlined" onClick={()=>handleRetake(item.idTopic)}>Retake</Button>
  
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
