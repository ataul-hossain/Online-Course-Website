import React from "react";
import AllCourses from "../../components/allCourses/AllCourses";

import "./Courses.css";

function Courses({ user, data, loading }) {
  return (
    <div className="courses-main-div">
      {loading ? (
        "loading"
      ) : (
        <div className="container">
          <AllCourses user={user} data={data} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default Courses;
