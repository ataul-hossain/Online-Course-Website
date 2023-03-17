import React from "react";
import "./DboardGreeting.css";

const DboardGreeting = ({ userData, loading }) => {
  return (
    <div className="dboard-greeting r-item">
      <h1>হ্যালো {userData.fullname}!</h1>
      <p>
        দেশের সেরা স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম স্কিলশিখুন এ আপনাকে স্বাগতম!
      </p>
    </div>
  );
};

export default DboardGreeting;
