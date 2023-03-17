import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    password: undefined,
  });
  const { password } = credentials;
  const phone = JSON.parse(localStorage.getItem("phone"));
  const { user, error, dispatch } = useContext(AuthContext);
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.length > 0) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("http://localhost:8000/api/login", {
          phone,
          password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      }
    }
    return false;
  };
  console.log(user);

  return (
    <div className="loginformNew">
      <div className="c-main">
        <input
          type="password"
          placeholder="পাসওয়ার্ড লিখুন"
          id="password"
          onChange={handleChange}
        />
        <button onClick={handleClick} className="login-btn">
          লগইন
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
