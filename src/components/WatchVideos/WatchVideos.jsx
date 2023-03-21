import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import downArrow from "../../images/icons/downArrow.png";
import video_play from "../../images/icons/video_play.png";

import Modal from "../Modal/Modal";

import "./WatchVideos.css";

const WatchVideos = ({ user, data, loading }) => {
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const { category, seo_slug } = useParams();
  const navigate = useNavigate();

  const course = data.find(
    (c, i) => c.course_category === category && c.seo_slug === seo_slug
  );
  const [active, setActive] = useState(-1);
  const [numToShow, setNumToShow] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const courseModule = course.course_module;
  const [videoId, setVideoId] = useState(
    courseModule[0].video[0].videoId || ""
  );

  const goToCheckOut = () => {
    navigate(`/checkout/${seo_slug}`);
  };

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

  const switchVideos = (videoId) => {
    setVideoId(videoId);
  };

  // Define a function to convert number to Bengali
  const toBengaliNumber = (num) => {
    return num.toLocaleString("bn-BD");
  };

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="video-main-div">
            <div className="container">
              <div className="watch-video">
                <div className="watch-left">
                  <div className="watch-video-container">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="watch-right">
                  <div className="course-module-video">
                    <div className="accordion_questions">
                      {courseModule.slice(0, numToShow).map((item, index) => (
                        <div
                          className="accordion-module"
                          key={index}
                          onClick={() => toggleAccordion(index)}
                        >
                          <div className="accordion-title">
                            <p className="module_number">
                              মডিউল{" "}
                              <span>
                                {toBengaliNumber(parseInt(index + 1))}
                              </span>
                            </p>
                            <div className="title">{item.title}</div>
                            {active === index ? (
                              <>
                                <div
                                  onClick={() => setOpenModal(true)}
                                  className="icon"
                                >
                                  {item.isFree === true ? (
                                    <div
                                      key={item.index}
                                      className="freevideo_icon"
                                    >
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
                                onClick={() => setOpenModal(true)}
                                className="icon"
                              >
                                {item.isFree === true ? (
                                  <div
                                    key={item.index}
                                    className="freevideo_icon"
                                  >
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
                            <div
                              className={
                                active === index ? "active" : "inactive"
                              }
                            >
                              <div className="accordion-main-content">
                                {item.isFree ? (
                                  item.video.map((vid, vi) => (
                                    <div key={vi} className="vid-link">
                                      <p>{vid.subtitle}</p>
                                      <button
                                        onClick={() =>
                                          switchVideos(vid.videoId)
                                        }
                                      >
                                        Play
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <div className="vid-link">
                                    <p>এই মডিউলে কোনও ফ্রি ভিডিও নেই</p>
                                  </div>
                                )}
                              </div>
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
                        {!user && (
                          <Modal
                            course={course}
                            user={user}
                            closeModal={setOpenModal}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sticky-div">
                  <div className="sticky-container">
                    {course.offer ? (
                      course.offer.map(
                        (offer, i) =>
                          offer.isOn && (
                            <div key={i} className="bottom-bar">
                              <div className="bar-price-container">
                                {course.batches.map(
                                  (batch, bi) =>
                                    batch.admission_going === true && (
                                      <div className="bottom-class-start">
                                        <p>
                                          ক্লাস শুরু হচ্ছে : {batch.start_date}
                                        </p>
                                      </div>
                                    )
                                )}
                                <div className="bar-price">
                                  <p>কোর্স ফি: </p>
                                  <strike>
                                    {toBengaliNumber(course.regular_price)}
                                  </strike>
                                  <p>{toBengaliNumber(offer.offer_price)}</p>
                                </div>
                              </div>

                              <div className="bar-cta">
                                <button
                                  onClick={goToCheckOut}
                                  className="bar-btn"
                                >
                                  ভর্তি হয়ে নিন
                                </button>
                              </div>
                            </div>
                          )
                      )
                    ) : (
                      <div className="bottom-bar">
                        {course.batches.map(
                          (batch, bi) =>
                            batch.admission_going === true && (
                              <div key={bi} className="bottom-class-start">
                                <p>ক্লাস শুরু হচ্ছে : {batch.start_date}</p>
                              </div>
                            )
                        )}
                        <div className="bar-price-container">
                          {course.batches.map(
                            (batch, bi) =>
                              batch.admission_going === true && (
                                <div key={bi} className="bottom-class-start">
                                  <p>ক্লাস শুরু হচ্ছে : {batch.start_date}</p>
                                </div>
                              )
                          )}
                          <div className="bar-price">
                            <p>কোর্স ফি: </p>
                            <p>{toBengaliNumber(course.regular_price)}</p>
                          </div>
                        </div>
                        <div className="bar-cta">
                          <button onClick={goToCheckOut} className="bar-btn">
                            ভর্তি হয়ে নিন
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WatchVideos;
