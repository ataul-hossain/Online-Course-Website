import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="list-col">
          <h1>প্লাটফর্ম</h1>
          <p>শিক্ষক হিসেবে জয়েন করুন</p>
          <p>স্টুডেন্ট হিসেবে জয়েন করুন</p>
          <p>কোর্সসমূহ</p>
          <p>লগইন</p>
        </div>
        <div className="list-col">
          <h1>কোম্পানি</h1>
          <p>প্রাইভেসি পলিসি</p>
          <p>রিফান্ড পলিসি</p>
          <p>সার্টিফিকেট ভেরিফাই</p>
        </div>
        <div className="list-col">
          <h1>যোগাযোগ</h1>
          <p>ফোন : 01679373645</p>
          <p>ইমেইল : contact@skillshikhun.com</p>
          <p>অ্যাপ ডাউনলোড করুন</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
