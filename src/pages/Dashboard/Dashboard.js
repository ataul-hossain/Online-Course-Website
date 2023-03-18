import "./Dashboard.css";
import JoinClass from "../../components/JoinClass/JoinClass";
import ClassRecording from "../../components/ClassRecording/ClassRecording";
import Sidebar from "../../components/Sidebar/Sidebar";
import DboardGreeting from "../../components/DboardGreeting/DboardGreeting";
import SelectCourse from "../../components/selectCourse/SelectCourse";
import { useEffect } from "react";

const Dashboard = ({ userData, data, loading }) => {
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
                <div className="greeting-msg">
                  <DboardGreeting userData={userData} />
                </div>
                <div className="enrolled-class">
                  <div className="join-class">
                    <p>ক্লাস জয়েনিং</p>
                    <JoinClass
                      data={data}
                      userData={userData}
                      loading={loading}
                    />
                  </div>
                  <div className="class-recording">
                    <p>ক্লাস রেকর্ডিং</p>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
