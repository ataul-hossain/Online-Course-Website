import React, { useEffect } from "react";
import "./YourCourses.css";
import AllCourses from "../allCourses/AllCourses";
import Sidebar from "../Sidebar/Sidebar";
import JoinClass from "../JoinClass/JoinClass";

const YourCourses = ({ userData, data, loading }) => {
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="dboard-wrapper">
      {loading ? (
        "loading"
      ) : (
        <div className="container">
          <div className="dboard-main">
            <div className="dboardleft">
              <Sidebar />
            </div>
            <div className="dboardright">
              <div className="right-wrapper ">
                {userData.enrolledCourses.length > 0 ? (
                  <div className="enrolled-class">
                    <p>ভর্তি হওয়া কোর্স</p>
                    {userData.enrolledCourses.map((course, index) => (
                      <div key={index}>
                        <JoinClass
                          userData={userData}
                          data={data}
                          loading={loading}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <h2>আপনি এখনও কোনও কোর্সে ভর্তি হননি</h2>
                )}
                <div>
                  {userData.enrolledCourses.map((course, index) => (
                    <div key={index} className="enrolled-class">
                      <p>আমাদের আরও কোর্স</p>
                      <AllCourses
                        hide={course.opt_a}
                        data={data}
                        loading={loading}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sidebar-container-mobile">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourCourses;
