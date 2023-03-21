import React, { useState } from "react";
import "./CheckPhone.css";
import axios from "axios";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import Login from "../Login/Login";
import { TailSpin } from "react-loader-spinner";
const CheckPhone = () => {
  const [loading, setLoading] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
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
      setLoading(true);
      await axios
        .post("https://vast-gray-bighorn-sheep-robe.cyclic.app/api/send-otp", {
          phone,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("phone", JSON.stringify(res.data.phone));
          setLoading(false);
          setOtpMsg(res.data.message);

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
  console.log(otpMsg);

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

            <button
              className="btn-loading"
              onClick={(e) => phoneCheck(e)}
              type="submit"
            >
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
                <p>শুরু করুন</p>
              )}
            </button>
          </form>
        </div>

        <div style={{ display: "none" }} id="new-login" className="new-login">
          <Login />
        </div>

        <div style={{ display: "none" }} id="verifyForm" className="verifyForm">
          <VerifyOTP otpMsg={otpMsg} />
        </div>
      </div>
    </>
  );
};

export default CheckPhone;
