import React, { useState } from "react";
import "./Login.css";
import { handlePostLogin } from "../../Services/LoginService.jsx";
import NotiAlert from "../../utils/noti.jsx";
import { useDispatch } from "react-redux";
import { getInfoUserById } from "../../Services/UserService.jsx";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helper/cookie.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await handlePostLogin({
      username: username,
      password: password,
    });
    console.log("Data recv:", response);
    if (response.ok) {
      setShowFailedAlert(false);
      setShowSuccessAlert(true);
      setCookie('user_id', response.id, 1)
      setCookie('user_token', response.token, 1)
      // dispatch({ type: "SET_STATUS", status: true })
      dispatch({ type: "SET_USER", payload: getInfoUserById(response.id) });
      setTimeout(() => {
        setShowSuccessAlert(false);
        // redirect quizz
        navigate("/quizz");
      }, 2000);
    } else {
      setShowSuccessAlert(false);
      setShowFailedAlert(true);
      setTimeout(() => setShowFailedAlert(false), 2500);
    }
  };

  return (
    <div className="login-container">
      {showSuccessAlert && (
        <div className="noti__login">
          <NotiAlert
            title="Login Successfully"
            message={"Welcome " + username}
            type="success"
          />
        </div>
      )}
      {showFailedAlert && (
        <div className="noti__login">
          <NotiAlert
            title="Login Failed"
            message="Mật khẩu sai rồi thì phải."
            type="error"
          />
        </div>
      )}

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="signup">
          <a href="/register">SignUp</a>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
