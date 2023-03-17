import React from "react";
import Lottie from "lottie-react";
import "./SelectCourse.css";
import Programming from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/Programming.json";
import GraphicDesign from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/GraphicDesign.json";
import VideoEditing from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/VideoEditing.json";
import DigitalMarketing from "/Users/ataulhossain/Desktop/ss-2.0/frontend/src/lottiefiles/DigitalMarketing.json";
import { Link } from "react-router-dom";

function SelectCourse() {
  return (
    <div className="wrapper">
      <h1>ফ্রি শেখা শুরু করুন!</h1>
      <div className="row-1">
        <Link
          className="link"
          to={
            "/dashboard/watch-recordings/free/programming/mern-stack-webdevelopment"
          }
        >
          <div className="r1-col1">
            <Lottie className="icons" animationData={Programming} loop={true} />

            <p className="skillname">প্রোগ্রামিং</p>
          </div>
        </Link>
        <Link
          className="link"
          to={"/dashboard/watch-recordings/free/design/graphics-design"}
        >
          <div className="r1-col1">
            <Lottie
              className="icons"
              animationData={GraphicDesign}
              loop={true}
            />
            <p className="skillname">গ্রাফিক্স ও ডিজাইন</p>
          </div>
        </Link>
      </div>
      <div className="row-2">
        <Link
          className="link"
          to={"/dashboard/watch-recordings/free/video-animation/video-editing"}
        >
          <div className="r1-col1">
            <Lottie
              className="icons"
              animationData={VideoEditing}
              loop={true}
            />
            <p className="skillname">ভিডিও ও অ্যানিমেশোন</p>
          </div>
        </Link>
        <Link
          className="link"
          to={"/dashboard/watch-recordings/free/marketing/digital-marketing"}
        >
          <div className="r1-col1">
            <Lottie
              className="icons"
              animationData={DigitalMarketing}
              loop={true}
            />
            <p className="skillname">ডিজিটাল মার্কেটিং</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SelectCourse;
