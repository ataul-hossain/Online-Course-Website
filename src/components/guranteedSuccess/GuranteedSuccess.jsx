import React from "react";
import "./GuranteedSuccess.css";
import Lottie from "lottie-react";
import guranteedSuccess from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/guranteedSuccess.json";
import fiveStar from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/fiveStar.json";

function GuranteedSuccess() {
  return (
    <div className="guaranteed-main-div">
      <div className="guaranteed-row">
        <div className="star-div">
          <Lottie
            className="secured"
            loop={false}
            animationData={guranteedSuccess}
          />
          <Lottie className="five-star" animationData={fiveStar} />
        </div>
        <div className="text-div">
          <h1>
            প্রত্যেক <span>স্টুডেন্টকে</span> নিয়ে আমাদের{" "}
            <span>ফ্রিল্যান্সিং</span> সাকসেস টিম এককভাবে কাজ করবে, যা নিশ্চিত
            করবে একটি <span>সফল ফ্রিল্যান্সিং ক্যারিয়ার।</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GuranteedSuccess;
