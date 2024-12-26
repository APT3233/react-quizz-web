import { useEffect, useState } from "react";
import "./Quizz.css";
import { getTopic } from "../../Services/QuizService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AllQuizz() {
  const [topic, setTopic] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/quizz/${id}`); 
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getTopic();
      setTopic(res);
      dispatch({ type: "SET_TOPIC", topic: res });
    };
    fetchApi();
  }, []);

  

  return (
    <>
      {topic ? (
        <div className="content__quizz">
          <div className="container-quizz">
            {topic.map((item, index) => (
              <div className="quizz__item" key={index}>
                <div className="img__item">
                  <img src={item.imgLink} alt="img"></img>
                </div>
                <div className="item__detail">
                  <h3>{item.name}</h3>
                  <button onClick={() => handleClick(item.id)}>
                    Quizz now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
