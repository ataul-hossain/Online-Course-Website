import React from "react";
import "./ReviewCarousel.css";

const ReviewCarousel = ({ data }) => {
  return (
    <>
      <div className="main-r-container">
        <h2>আমাদের স্টুডেন্টরা যা বলছে</h2>
        {data.map((i, index) => (
          <div key={index} className="r-container">
            <div className="image-container">
              <img src={i.image} alt="" />
              <h2>{i.name}</h2>
            </div>
            <div className="review">{i.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewCarousel;

// data.filter((i) => i.courseName === "Full Stack Web Development", {});
