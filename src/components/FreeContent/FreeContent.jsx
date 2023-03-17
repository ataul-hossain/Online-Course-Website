import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import SelectCourse from "../selectCourse/SelectCourse";
import "./FreeContent.css";

const FreeContent = ({ loading }) => {
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
              <div className="sidebar-container">
                <Sidebar />
              </div>
            </div>
            <div className="dboardright">
              <div className="right-wrapper ">
                <div className="free-content">
                  <SelectCourse />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeContent;
