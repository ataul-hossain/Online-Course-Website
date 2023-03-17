import React, { useState } from "react";
import "./CourseModule.css";
import downArrow from "../../images/icons/downArrow.png";
import video_play from "../../images/icons/video_play.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const CourseModule = ({ course, courseModule }) => {
  const [active, setActive] = useState(-1);
  const [numToShow, setNumToShow] = useState(10);
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const toggleAccordion = (index) => {
    if (index === active) {
      setActive(-1);
    } else {
      setActive(index);
    }
  };

  const showAll = () => {
    setNumToShow(courseModule.length);
  };

  const hideAll = () => {
    setNumToShow(10);
  };
  const toBengaliNumber = (num) => {
    return num.toLocaleString("bn-BD");
  };

  const navigate = useNavigate();

  // const videoId = data
  //   .slice(0, numToShow)
  //   .map(
  //     (item, index) =>
  //       item.isFree && item.video.map((video, vI) => video.videoId)
  //   );

  return (
    <div className="course-module">
      <h1>কোর্সে কি কি শেখানো হবে?</h1>
      <div className="accordion_questions">
        {courseModule.slice(0, numToShow).map((item, index) => (
          <div
            className="accordion-module"
            key={index}
            onClick={() => toggleAccordion(index)}
          >
            <div className="accordion-title">
              <p className="module_number">
                মডিউল <span>{toBengaliNumber(parseInt(index + 1))}</span>
              </p>
              <div className="title">{item.title}</div>
              {active === index ? (
                <>
                  <div
                    onClick={
                      !user
                        ? () => setOpenModal(true)
                        : navigate(
                            `/dashboard/watch-recordings/free/${course.course_category}/${course.seo_slug}`
                          )
                    }
                    className="icon"
                  >
                    {item.isFree === true ? (
                      <div key={item.index} className="freevideo_icon">
                        <p>ফ্রি</p>
                        <img src={video_play} alt="" />
                      </div>
                    ) : (
                      <img src={downArrow} alt="" />
                    )}
                  </div>
                </>
              ) : (
                <div
                  onClick={
                    !user
                      ? () => setOpenModal(true)
                      : navigate(
                          `/dashboard/watch-recordings/free/${course.course_category}/${course.seo_slug}`
                        )
                  }
                  className="icon"
                >
                  {item.isFree === true ? (
                    <div key={item.index} className="freevideo_icon">
                      <p>ফ্রি</p>
                      <img src={video_play} alt="" />
                    </div>
                  ) : (
                    <img src={downArrow} alt="" />
                  )}
                </div>
              )}
            </div>
            <div className="accordion-content">
              <div className={active === index ? "active" : "inactive"}>
                <div className="accordion-main-content">{item.description}</div>
              </div>
            </div>
          </div>
        ))}
        {numToShow < courseModule.length ? (
          <button className="accordion-button" onClick={showAll}>
            আরও {courseModule.length - numToShow}টি মডিউল দেখুন
          </button>
        ) : (
          <button className="accordion-button" onClick={hideAll}>
            অল্প দেখুন
          </button>
        )}
      </div>
      {openModal && (
        <div>
          <Modal course={course} user={user} closeModal={setOpenModal} />
        </div>
      )}
    </div>
  );
};

export default CourseModule;
