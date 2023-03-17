import React from "react";
import "./SuccessHistory.css";

const SuccessHistory = ({ user, userData, data, loading, error }) => {
  // Define a function to convert number to Bengali
  const toBengaliNumber = (num) => {
    return num.toLocaleString("bn-BD");
  };

  return (
    <div className="payments-container">
      {userData.enrolledCourses.length > 0 &&
        userData.enrolledCourses.map(
          (course, i) =>
            course.pay_status === "Successful" && (
              <div key={i} className="success-container">
                <div className="first-content">
                  <div className="course-name-payment">
                    <p>
                      কোর্স : <span className="tx-items">{course.opt_a}</span>
                    </p>

                    <p>
                      ব্যাচ :{" "}
                      <span className="tx-items">
                        {toBengaliNumber(parseInt(course.opt_b))}
                      </span>
                    </p>
                  </div>
                  <div className="payment-method">
                    <p>
                      পেমেন্ট মেথড :{" "}
                      <span className="tx-items">{course.card_type}</span>
                    </p>
                    <p>
                      ট্রাঞ্জ্যাকশন আইডি :{" "}
                      <span className="tx-items">{course.mer_txnid}</span>
                    </p>
                  </div>
                </div>
                <div className="second-content">
                  <div className="payment-price">
                    <p>
                      মোট টাকা :{" "}
                      <span className="tx-items">
                        {toBengaliNumber(parseInt(course.amount))}
                      </span>
                    </p>{" "}
                    <p>
                      সময় :{" "}
                      <span className="tx-items">
                        {new Date(course.pay_time).toLocaleString("bn-BD")}
                      </span>
                    </p>
                  </div>
                  <div className="pay-status">
                    <p>পেমেন্ট স্ট্যাটাস : </p>
                    <span className="tx-items success">
                      {course.pay_status}
                    </span>
                  </div>
                </div>
              </div>
            )
        )}
      {userData.cancelledPayments.length > 0 &&
        userData.cancelledPayments.map((course, i) => (
          <div key={i} className="success-container">
            <div className="first-content">
              <div className="course-name-payment">
                <p>
                  কোর্স : <span className="tx-items">{course.opt_a}</span>
                </p>

                <p>
                  ব্যাচ :{" "}
                  <span className="tx-items">
                    {toBengaliNumber(parseInt(course.opt_b))}
                  </span>
                </p>
              </div>
              <div className="payment-method">
                <p>
                  পেমেন্ট মেথড :{" "}
                  <span className="tx-items">{course.card_type}</span>
                </p>
                <p>
                  ট্রাঞ্জ্যাকশন আইডি :{" "}
                  <span className="tx-items">{course.mer_txnid}</span>
                </p>
              </div>
            </div>
            <div className="second-content">
              <div className="payment-price">
                <p>
                  মোট টাকা :{" "}
                  <span className="tx-items">
                    {toBengaliNumber(parseInt(course.amount))}
                  </span>
                </p>{" "}
                <p>
                  সময় :{" "}
                  <span className="tx-items">
                    {new Date(course.pay_time).toLocaleString("bn-BD")}
                  </span>
                </p>
              </div>
              <div className="pay-status">
                <p>পেমেন্ট স্ট্যাটাস : </p>
                <span className="tx-items failed">{course.pay_status}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SuccessHistory;
