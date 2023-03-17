import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { fullname, email, password } = input;
  const phone = JSON.parse(localStorage.getItem("phone"));
  const otp = JSON.parse(localStorage.getItem("otp"));
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async (e) => {
    e.preventDefault();
    if (fullname.length > 0 && email.length > 0 && password.length > 0) {
      try {
        await axios
          .post("http://localhost:8000/api/register", {
            phone,
            otp,
            fullname,
            email,
            password,
          })
          .then((res) => {
            console.log(res.data);
            Login();
          });
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  };

  const Login = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        phone,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      <div className="register-form">
        <form className="c-main" action="">
          <input
            type="text"
            name="fullname"
            placeholder="আপনার ভাল নাম লিখুন"
            required={true}
            onChange={(e) => handleChange(e)}
            id="fullname"
          />
          <input
            type="email"
            name="email"
            placeholder="আপনার ইমেইল লিখুন"
            required={true}
            onChange={(e) => handleChange(e)}
            id="email"
          />
          <input
            type="password"
            name="password"
            placeholder="পাসওয়ার্ড সিলেক্ট করুন"
            required={true}
            onChange={(e) => handleChange(e)}
            id="password"
          />
          <button onClick={(e) => register(e)} type="submit">
            ভেরিফাই করুন
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
