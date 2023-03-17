import React from "react";
import fivestudents from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/images/fivestudents.png";
import "./Fiverperbatch.css";

function Fiveperbatch() {
  return (
    <div className="five-main-div">
      <div className="col-2">
        <img src={fivestudents} alt="" />
      </div>
      <div className="col-1">
        <h2>
          আমাদের প্রতিটি ব্যাচে স্টুডেন্ট মাত্র
          <br />
          <span> ৫ জন!</span>
        </h2>
        <p>
          যা নিশ্চিত করবে আপনার <span>শতভাগ স্কিল শেখা</span> ও শিক্ষকের কাছ
          থেকে <span> অতুলনীয় সাপোর্ট।</span>
        </p>
      </div>
    </div>
  );
}

export default Fiveperbatch;
