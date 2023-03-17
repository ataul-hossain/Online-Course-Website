import React, { useEffect } from "react";
import "./Course.css";
import calendar from "../../images/icons/calendar.png";
import clock from "../../images/icons/clock.png";
import daynight from "../../images/icons/daynight.png";
import tick from "../../images/icons/tick.png";
import CourseModule from "../../components/module/CourseModule";
import DemoClassReg from "../../components/demoClassReg/DemoClassReg";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";

import { useNavigate, useParams } from "react-router-dom";
import AllCourses from "../../components/allCourses/AllCourses";

function Course({ user, data, loading }) {
  const { seo_slug } = useParams();
  const course = data.find((course) => course.seo_slug === seo_slug);

  const navigate = useNavigate();
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const goToCheckOut = () => {
    navigate(`/checkout/${seo_slug}`);
  };

  return loading ? (
    "loading"
  ) : (
    <>
      <div className="course-header">
        <div className="container">
          <div className="course-container">
            <div className="hero-text">
              <h1>{course.course_title}</h1>
              <p>{course.course_description}</p>
            </div>
            <div className="video-container">
              <div className="yt-container">
                <div className="player-container">
                  <iframe
                    width="560"
                    height="315"
                    src={course.course_promo_video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                {course.batches.map((i, index) => (
                  <div key={index} className="schedule-container">
                    <div className="nextbatch sub-container">
                      <img src={calendar} alt="" />
                      <div className="subtext">
                        <h2>ব্যাচ শুরু হচ্ছে:</h2>
                        <p>{i.start_date}</p>
                      </div>
                    </div>
                    <div className="classtime sub-container">
                      <img src={clock} alt="" />
                      <div className="subtext">
                        <h2>ক্লাসের সময়:</h2>
                        <p>{i.class_time}</p>
                      </div>
                    </div>
                    <div className="classdays sub-container">
                      <img src={daynight} alt="" />
                      <div className="subtext">
                        <h2>ক্লাসের দিন গুলো:</h2>
                        <p>{i.class_days}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="features-container">
                <div className="feature-title">এই কোর্সটি ক্যাদের জন্য?</div>
                {course.course_features.map((i, index) => (
                  <div key={index} className="feature">
                    <img src={tick} alt="" />
                    <p>{i.item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="module-container">
            <div className="course-module">
              <CourseModule
                course={course}
                courseModule={course.course_module}
              />
            </div>

            <div className="instructor">
              <h1>কোর্স ইন্সট্রাক্টর</h1>
              {course.instructor.map((i, index) => (
                <div key={index} className="instructor-container">
                  <div className="ins-image">
                    <img src={i.instructor_image} alt="" />
                  </div>
                  <div className="designation">
                    <p className="ins-name">{i.name} </p>
                    <p className="ins-current-position">
                      {i.ins_current_position}
                    </p>
                    <p className="ins-previous-position">
                      {i.ins_previous_position}
                    </p>
                  </div>
                </div>
              ))}

              <div className="review-section">
                <ReviewCarousel data={course.reviews} />
              </div>
              <div className="community">
                <div className="text-container">
                  <h1>সোশ্যাল মিডিয়ায় আমরা</h1>
                </div>
                <div className="button-container">
                  <button className="yt button">
                    <YouTubeIcon />
                    ইউটিউব
                  </button>
                  <button className="fb button">
                    <FacebookIcon />
                    ফেইসবুক
                  </button>
                  <button className="ig button">
                    <InstagramIcon />
                    ইন্সটাগ্রাম
                  </button>
                  <button className="tiktok button">টিকটক</button>
                </div>
              </div>
            </div>
            {!user && (
              <div className="main-login-container">
                <h1>ড্যাশবোর্ডে লগইন করুন</h1>
                <div className="login-container">
                  <DemoClassReg />
                </div>
              </div>
            )}
          </div>
          {course.offer.map((i, index) => (
            <div key={index} className="cta-container">
              <div className="offer-row">
                <p className="offer-msg">{i.offer_msg}</p>
              </div>
              <div className="button-row">
                <p>
                  <span className="old-price">{course.regular_price_bn}</span>{" "}
                  টাকার এই কোর্সটি পাচ্ছেন মাত্র{" "}
                  <span className="offer-price">{i.offer_price_bn}</span> টাকায়!
                </p>
                <button onClick={goToCheckOut} className="cta-button">
                  ভর্তি হয়ে যান এখনই!
                </button>
              </div>
            </div>
          ))}
          <div className="all-courses-div">
            <h2>আমাদের আরও কোর্সসমূহ</h2>
            <AllCourses
              data={data}
              hide={course.course_title}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
