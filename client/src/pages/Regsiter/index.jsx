import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "../../Services/UserService";
import NotiAlert from "../../utils/noti";
import { setCookie } from "../../helper/cookie";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser({
      email: email,
      username: username,
      password: password,
    });
    console.log(response);
    if (response.ok) {
      setShowFailedAlert(false);
      setShowSuccessAlert(true);
      setCookie('user_id', response.id, 1)
      setCookie('user_token', response.token, 1)
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/quizz')
      }, 2000);
      // redirect quizz
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
            title="Register Successfully"
            message={"Welcome " + username}
            type="success"
          />
        </div>
      )}
      {showFailedAlert && (
        <div className="noti__login">
          <NotiAlert
            title="Register Failed"
            message="Sai cái gì đó rồi."
            type="error"
          />
        </div>
      )}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <p className="login">
          <a href="/login">Login</a>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
