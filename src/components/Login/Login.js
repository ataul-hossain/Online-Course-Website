import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

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
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length > 0) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://vast-gray-bighorn-sheep-robe.cyclic.app/api/login",
          {
            phone,
            password,
          }
        );

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setLoading(false);
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
        <button onClick={handleClick} className="login-btn btn-loading">
          {loading ? (
            <TailSpin
              height="20"
              width="20"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <p>লগইন</p>
          )}
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
