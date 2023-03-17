import React, { useEffect, useState } from "react";
import "./DemoClassReg.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DemoClassReg() {
  const { user: existUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    phone: "",
    otp: "",
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(user);

  const { phone, otp, password, ...others } = user;

  const sendOtp = async () => {
    //Post phone number to sendOtp api

    await axios
      .post("http://localhost:8000/api/send-otp", { phone })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          document.getElementById("step1").style.display = "none";
          document.getElementById("step4").style.display = "block";
        } else {
          document.getElementById("step1").style.display = "none";
          document.getElementById("step2").style.display = "block";
        }
      });

    //If backend otp send success? then store the OTP in DB & show the next step.
  };

  const verifyOtp = async () => {
    //Post the code to the verify api
    await axios
      .post("http://localhost:8000/api/verify-otp", { phone, otp })
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          document.getElementById("step2").style.display = "none";
          document.getElementById("step3").style.display = "block";
        }
      });

    //If the user's input is equal to the OTP in the database, then success and run this and if not, show a error alert to the user.
  };
  const credentials = { phone, password };
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    // post all data to the createuser api
    // save the user to the db
    // show success alert.
    e.preventDefault();
    await axios.post("http://localhost:8000/api/register", user).then((res) => {
      console.log(res.data);
      Login();
    });
  };

  const Login = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8000/api/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <>
      {!existUser ? (
        <div id="demo-form" className="demo-form">
          {/* <h2>লগইন করুন ড্যাশবোর্ডে</h2> */}
          <div className="main-form">
            <div id="step1" className="step1">
              <div className="noBorder">
                <div className="c-code">+88</div>
                <input
                  placeholder="ফোন নম্বর লিখুন"
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  maxLength={11}
                  autoComplete="off"
                />
              </div>
              {user.phone.length === 11 ? (
                <button id="start-btn" onClick={sendOtp} className="start-btn">
                  শুরু করুন
                </button>
              ) : (
                <button disabled id="start-btn" className="start-btn">
                  শুরু করুন
                </button>
              )}
            </div>
            <div id="step2" style={{ display: "none" }} className="step2">
              <div className="input">
                <input
                  placeholder="আপনার ফোনে পাঠানো কোডটি লিখুন"
                  type="number"
                  id="otp"
                  name="otp"
                  autoFocus={true}
                  maxLength={4}
                  onChange={handleChange}
                />
              </div>
              {user.otp.length === 4 ? (
                <button
                  id="verify-btn"
                  onClick={verifyOtp}
                  className="verify-btn"
                >
                  ভেরিফাই করুন
                </button>
              ) : (
                <button disabled id="verify-btn" className="verify-btn">
                  ভেরিফাই করুন
                </button>
              )}
            </div>
            <div id="step3" style={{ display: "none" }} className="step3">
              <div className="input">
                <input
                  placeholder="আপনার পুরো নাম লিখুন"
                  id="fullname"
                  name="fullname"
                  autoFocus
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="input">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  id="email"
                  name="email"
                  autoFocus
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="input">
                <input
                  placeholder="আপনার পাসওয়ার্ড সেট করুন"
                  id="password"
                  name="password"
                  type="password"
                  autoFocus
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                onClick={registerUser}
                id="submit-btn"
                className="submit-btn"
              >
                অ্যাকাউন্ট খুলে ফেলুন
              </button>
            </div>
            <div id="step4" style={{ display: "none" }} className="step4">
              <div className="input">
                <div className="c-code">+88</div>
                <input
                  disabled
                  value={phone}
                  placeholder="ফোন নম্বর লিখুন"
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  maxLength={11}
                  autoComplete="off"
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  name="password"
                  id="login_password"
                  onChange={handleChange}
                />
              </div>
              <button onClick={Login}>লগইন</button>
            </div>
          </div>
        </div>
      ) : (
        <p>You are logged in </p>
      )}
    </>
  );
}

export default DemoClassReg;
