import { useNavigate } from "react-router-dom";
import banner from "./banner.png";
import "./Home.css";
export default function Home() {
  const navigate = useNavigate()
  const handleClick = () => navigate('/quizz')
  return (
    <>
      <div className="content-1">
        <div className="container-content">
          <div className="content__left">
            <h1>Online</h1>
            <h2>Quizz</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
              consequuntur nisi quod placeat obcaecati voluptatum libero odio
              expedita ullam! Earum, maxime sed ducimus incidunt consectetur
              illum ipsum commodi aliquid quia?
            </p>
            <button onClick={handleClick}>Start now</button>
          </div>
          <div className="banner">
            <img src={banner} alt="banner" />
          </div>
        </div>
      </div>
    </>
  );
}
