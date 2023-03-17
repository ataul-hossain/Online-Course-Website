import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import downArrow from "../../images/icons/downArrow.png";
import video_play from "../../images/icons/video_play.png";

import Modal from "../Modal/Modal";

import "./WatchVideos.css";

const WatchVideos = ({ user, data, userData, loading, error }) => {
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const { category, seo_slug } = useParams();

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

  console.log(videoId);
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
                                    <div className="vid-link">
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WatchVideos;
