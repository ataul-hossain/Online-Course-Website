import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuccessHistory from "../../components/successTran/SuccessHistory";
import "./Transactions.css";

const Transactions = ({ userData, data, loading }) => {
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
                <div className="enrolled-class">
                  <SuccessHistory
                    userData={userData}
                    data={data}
                    loading={loading}
                  />
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

export default Transactions;
