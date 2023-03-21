import "./Dashboard.css";
import JoinClass from "../../components/JoinClass/JoinClass";
import ClassRecording from "../../components/ClassRecording/ClassRecording";
import Sidebar from "../../components/Sidebar/Sidebar";
import DboardGreeting from "../../components/DboardGreeting/DboardGreeting";
import SelectCourse from "../../components/selectCourse/SelectCourse";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import AllCourses from "../../components/allCourses/AllCourses";

const Dashboard = ({ user, data, loading }) => {
  const [userData, setUserData] = useState([]);
  const location = window.location.href;
  const fetchUserData = async () => {
    const res = await axios.get(`http://localhost:8000/api/user/${user.phone}`);
    setUserData(res.data);
  };
  function Logout() {
    localStorage.clear();
    window.location.reload(); // optional: reload the page to see the changes immediately
  }

  useEffect(() => {
    fetchUserData();
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
                <div className="greeting-msg">
                  <DboardGreeting userData={userData} />
                </div>
                <div className="enrolled-class">
                  <div className="join-class">
                    <JoinClass
                      data={data}
                      userData={userData}
                      loading={loading}
                    />
                  </div>
                  <div className="class-recording">
                    <ClassRecording
                      data={data}
                      userData={userData}
                      loading={loading}
                    />
                  </div>
                </div>
                <div className="free-content">
                  <SelectCourse
                    userData={userData}
                    data={data}
                    loading={loading}
                  />
                </div>
                <div className="your-courses">
                  {userData.enrolledCourses?.length > 0 ? (
                    userData.enrolledCourses.map((c, ci) => (
                      <AllCourses
                        hide={c.opt_a}
                        userData={userData}
                        data={data}
                        loading={loading}
                      />
                    ))
                  ) : (
                    <AllCourses
                      userData={userData}
                      data={data}
                      loading={loading}
                    />
                  )}
                </div>
                <button onClick={Logout}>Logout</button>
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

export default Dashboard;
