import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./DefaultLayout.css";
import logo from "../../../logo.png";
import { useEffect, useState } from "react";
import { clearCookie, getCookie } from "../../../helper/cookie";

export default function LayoutDefault() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleClick = () => navigate("/");
  

  const className = (e) => {
    return e.isActive ? "navbar__link--active" : "navbar__link";
  };

  const LoggedIn = () => {
    const token = getCookie('user_token')
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    clearCookie()
    setIsLoggedIn(false); 
    navigate("/login");
  };

  useEffect(() => {
    LoggedIn(); 
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="main-1">
            <div className="logo">
              <img src={logo} onClick={handleClick} alt="logo" />
            </div>
            <div className="navbar">
              <ul>
                <li>
                  <NavLink to="/" className={className}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/quizz" className={className}>
                    Quizz
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/result" className={className}>
                    Result
                  </NavLink>
                </li>
                {!isLoggedIn ? (
                  <li>
                    <NavLink to="/login" className={className}>
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <Link to="#" onClick={handleLogout} className={className}>
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>
        <p>CopyRight: APT3233</p>
        <a href="https://t.me/apt3233" target="_blank" rel="noreferrer">
          Contact me!
        </a>
      </footer>
    </>
  );
}