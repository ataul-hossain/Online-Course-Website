import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="header-container">
        <div className="left">
          <div className="logo">
            <Link className="link" to={"/"}>
              <img src={logo} alt="Skillshikhun Logo" />
            </Link>
          </div>
        </div>
        <div className="middle">
          <Link className="link" to={"/courses"}>
            <span className="nav-items nav-first">কোর্সসমূহ</span>
          </Link>
          <Link to={"/admission"} className="link">
            <span className="nav-items">ভর্তি</span>
          </Link>
          <Link className="link" to={"/how-to-pay"}>
            <span className="nav-items">পেমেন্ট</span>
          </Link>
          <Link className="link" to={"/dashboard/join-class"}>
            <span className="nav-items nav-last">ক্লাস জয়েন</span>
          </Link>
        </div>
        <div className="right">
          {user ? (
            <Link className="link" to={"/dashboard"}>
              <button className="login-button">
                ড্যাশবোর্ড
                <LoginIcon />
              </button>
            </Link>
          ) : (
            <Link className="link" to={"/login"}>
              <button className="login-button">
                লগইন
                <LoginIcon />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
