import React, { useState } from "react";
import "./CheckPhone.css";
import axios from "axios";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import Login from "../Login/Login";

const CheckPhone = () => {
  const [inputData, setInputData] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputData);

  const { phone } = inputData;

  const phoneCheck = async (e) => {
    e.preventDefault();
    if (phone.length === 0) {
      return false;
    }

    try {
      await axios
        .post("http://localhost:8000/api/send-otp", { phone })
        .then((res) => {
          console.log(res);
          localStorage.setItem("phone", JSON.stringify(res.data));

          if (res.status === 200) {
            document.getElementById("checkPhone-form").style.display = "none";
            document.getElementById("new-login").style.display = "block";
          } else {
            document.getElementById("checkPhone-form").style.display = "none";
            document.getElementById("verifyForm").style.display = "block";
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mother-div">
        <div id="checkPhone-form" className="checkPhone-form">
          <form className="c-main" action="">
            <input
              type="phone"
              name="phone"
              placeholder="আপনার ফোন নম্বর দিন"
              required={true}
              onChange={(e) => handleChange(e)}
              maxLength={11}
              id="phone"
            />
            <button onClick={(e) => phoneCheck(e)} type="submit">
              শুরু করুন
            </button>
          </form>
        </div>

        <div style={{ display: "none" }} id="new-login" className="new-login">
          <Login />
        </div>

        <div style={{ display: "none" }} id="verifyForm" className="verifyForm">
          <VerifyOTP />
        </div>
      </div>
    </>
  );
};

export default CheckPhone;
