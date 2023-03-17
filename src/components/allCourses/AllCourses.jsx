import "./AllCourses.css";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import VideocamIcon from "@mui/icons-material/Videocam";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { Link } from "react-router-dom";
import { useEffect } from "react";

function AllCourses({ user, hide, data, loading, course }) {
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  // const course = courseData;

  // const { data, loading, error } = useFetch(
  //   "http://localhost:8000/api/courses"
  // );
  // console.log(data);

  return (
    <div className="all-courses">
      <div className="cards-container">
        {loading ? (
          "Loading"
        ) : course ? (
          <div>
            <Link className="link fix" to={`/course/${course.seo_slug}`}>
              <div className="card">
                <div className="card-img">
                  <img src={course.course_thumbnail} alt={course.seo_title} />
                </div>
                <div className="features">
                  <div className="duration f-items">
                    <span className="time-icon">
                      <AccessTimeFilledIcon />
                    </span>
                    <p>{course.course_duration}মাস</p>
                  </div>
                  <div className="ClassCount f-items">
                    <span className="class-time">
                      <VideocamIcon />
                    </span>
                    <p>{course.num_Classes} ক্লাস</p>
                  </div>
                  <div className="classRecording f-items">
                    <span className="class-recording-icon">
                      <OndemandVideoIcon />
                    </span>
                    <p>রেকর্ডিং</p>
                  </div>
                  <div className="support f-items">
                    <span className="support-icon">
                      <SupportAgentIcon />
                    </span>
                    <p>সাপোর্ট</p>
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-title">
                    <p>{course.course_title}</p>
                  </div>
                  <div className="card-price">
                    <p>বিস্তারিত দেখুন</p>
                    {/* <div className="price-per-month">
                    <p className="price">{i.regular_price_bn}</p>
                  </div> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          data.map(
            (i, index) =>
              i.course_title !== hide && (
                <Link
                  key={index}
                  className="link fix"
                  to={`/course/${i.seo_slug}`}
                >
                  <div className="card">
                    <div className="card-img">
                      <img src={i.course_thumbnail} alt={i.seo_title} />
                    </div>
                    <div className="features">
                      <div className="duration f-items">
                        <span className="time-icon">
                          <AccessTimeFilledIcon />
                        </span>
                        <p>{i.course_duration}মাস</p>
                      </div>
                      <div className="ClassCount f-items">
                        <span className="class-time">
                          <VideocamIcon />
                        </span>
                        <p>{i.num_Classes} ক্লাস</p>
                      </div>
                      <div className="classRecording f-items">
                        <span className="class-recording-icon">
                          <OndemandVideoIcon />
                        </span>
                        <p>রেকর্ডিং</p>
                      </div>
                      <div className="support f-items">
                        <span className="support-icon">
                          <SupportAgentIcon />
                        </span>
                        <p>সাপোর্ট</p>
                      </div>
                    </div>
                    <div className="card-info">
                      <div className="card-title">
                        <p>{i.course_title}</p>
                      </div>
                      <div className="card-price">
                        <p>বিস্তারিত দেখুন</p>
                        {/* <div className="price-per-month">
                    <p className="price">{i.regular_price_bn}</p>
                  </div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              )
          )
        )}
      </div>
    </div>
  );
}

export default AllCourses;
