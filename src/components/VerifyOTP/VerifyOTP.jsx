import axios from "axios";
import React from "react";
import { useState } from "react";
import Register from "../Register/Register";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const [input, setInput] = useState({
    otp: "",
  });

  const phone = JSON.parse(localStorage.getItem("phone"));
  const { otp } = input;

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      try {
        await axios
          .post("http://localhost:8000/api/verify-otp", { phone, otp })
          .then((res) => {
            console.log(res);
            localStorage.setItem("otp", JSON.stringify(res.data));
            if (res.status === 200) {
              document.getElementById("verifyOTP-form").style.display = "none";
              document.getElementById("register").style.display = "block";
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  };
  // console.log(phone);
  // console.log(input);

  return (
    <>
      <div id="verifyOTP-form" className="verifyOTP-form">
        <form className="c-main" action="">
          <input
            type="phone"
            name="otp"
            placeholder="OTP কোড দিন"
            required={true}
            onChange={(e) => handleChange(e)}
            id="otp"
          />
          <button onClick={(e) => verifyOTP(e)} type="submit">
            ভেরিফাই করুন
          </button>
        </form>
      </div>
      <div style={{ display: "none" }} id="register" className="register">
        <Register />
      </div>
    </>
  );
};

export default VerifyOTP;
