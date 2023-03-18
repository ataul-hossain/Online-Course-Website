import axios from "axios";
import React from "react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckPhone from "../../components/CheckPhone/CheckPhone";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";
import "./Checkout.css";

function Checkout({ user, data, loading, error }) {
  const { seo_slug } = useParams();
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const course = data.find((course) => course.seo_slug === seo_slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seo_slug]);

  const makePaymentRequest = async () => {
    try {
      await axios
        .post(
          "https://secure.aamarpay.com/jsonpost.php",
          JSON.stringify({
            store_id: "skillshikhun",
            signature_key: "7445cc98363b6b9cae4af766ef0f0186",
            cus_name: `${user.fullname}`,
            cus_email: `${user.email}`,
            cus_phone: `${user.phone}`,
            cus_add1: "Dhaka, Bangladesh",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            amount: 1,
            // amount: `${
            //   course.offer ? course.offer[0]?.offer_price : course.regular_price
            // }`,
            tran_id: `SS_${Math.floor(Math.random() * 900000 + 100000)}`,
            currency: "BDT",
            success_url:
              "https://vast-gray-bighorn-sheep-robe.cyclic.app/api/enroll",
            fail_url:
              "https://vast-gray-bighorn-sheep-robe.cyclic.app/api/cancelled",
            cancel_url: `https://online-course-website-opal.vercel.app/course/${seo_slug}`,
            desc: "Lend Money",
            type: "json",
            opt_a: `${course.course_title}`,
            opt_b: `${course.batches.map(
              (batch) => batch.admission_going === true && batch.batch_number
            )}`,
          })
        )
        .then((res) => {
          localStorage.setItem("paymentUrl", res.data.payment_url);
          window.location.replace(res.data.payment_url);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/user/${user.phone}`
      );
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmitCalled");
    await makePaymentRequest();
    await getUserData();
  };

  return (
    <div className="main-checkout-div">
      {!user ? (
        <>
          <h1>ভর্তি হয়ে নিতে লগইন করে নিন</h1>
          <CheckPhone />
        </>
      ) : (
        <>
          {loading ? (
            "loading"
          ) : (
            <div className="container">
              <div className="checkout-box">
                <h2>আপনি যে কোর্সে ভর্তি হচ্ছেন</h2>
                <div className="checkout-detail-box">
                  <div className="checkout-course-img-container">
                    <img src={course.course_thumbnail} alt="" />
                  </div>
                  <div className="checkout-course-details">
                    <p>{course.course_title}</p>
                    {course.offer ? (
                      <p className="fee">
                        ফি : <strike>{course.regular_price_bn}</strike>{" "}
                        {course.offer[0]?.offer_price_bn} টাকা
                      </p>
                    ) : (
                      <p className="fee">ফি : {course.regular_price_bn} টাকা</p>
                    )}
                    <div className="classtimings">
                      <p>
                        ক্লাস শুরু হচ্ছে :{" "}
                        {course.batches.map(
                          (batch) =>
                            batch.admission_going === true && batch.start_date
                        )}
                      </p>
                    </div>

                    <div className="checkout-button-container">
                      <button onClick={handleSubmit} className="checkout-btn">
                        ফি পরিশোধ করে ভর্তি হয়ে নিন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout-review-section">
                <ReviewCarousel data={course.reviews} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Checkout;
