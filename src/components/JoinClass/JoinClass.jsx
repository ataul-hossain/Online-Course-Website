import React from "react";
import "./JoinClass.css";

import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const JoinClass = ({ userData, data }) => {
  return (
    <div>
      <div className="dboard-yourcourses r-item">
        <div className="course-wrapper">
          {userData.enrolledCourses.length === 0 ? (
            <p>আপনি এখনও কোনও কোর্সে ভর্তি হননি </p>
          ) : (
            userData.enrolledCourses.map((c, x) => (
              <div className="course-wrapper" key={x}>
                {data.map(
                  (course, index) =>
                    course.course_title === c.opt_a && (
                      <div key={index} className="course-details">
                        <div className="course-img-container">
                          <img
                            className="course-img"
                            src={course.course_thumbnail}
                            alt={course.course_title}
                          />
                        </div>
                        <div className="course-title-container">
                          <p>{course.course_title}</p>
                          <p>Batch {c.opt_b}</p>
                        </div>
                        <div className="join-btn-container">
                          {course.batches.map(
                            (batch, bi) =>
                              batch.batch_number === c.opt_b && (
                                <Link
                                  to={batch.class_link}
                                  key={bi}
                                  className="link"
                                >
                                  <button className="join-class-btn">
                                    ক্লাস জয়েন করুন
                                  </button>
                                </Link>
                              )
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            ))
          )}
        </div>
        <div className="sidebar-container-mobile">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
