import React from "react";
import "./WatchRecordings.css";
import ClassRecording from "../../components/ClassRecording/ClassRecording";
import Sidebar from "../../components/Sidebar/Sidebar";

const WatchRecordings = ({ userData, user, data, loading, error }) => {
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
                {userData.enrolledCourses.length === 0 ? (
                  <div className="enrolled-class">
                    <h2>আপনি এখনও কোনও কোর্সে ভর্তি হননি</h2>
                  </div>
                ) : (
                  <div className="enrolled-class">
                    <p>আপনার ক্লাস রেকর্ডিং</p>
                    <div className="join-class">
                      <ClassRecording
                        data={data}
                        userData={userData}
                        loading={loading}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchRecordings;
