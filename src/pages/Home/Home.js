import React, { useEffect } from "react";
import "./Home.css";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import AllCourses from "../../components/allCourses/AllCourses";
import Fiveperbatch from "../../components/fiveperbatch/Fiveperbatch";
import SelectCourse from "../../components/selectCourse/SelectCourse";
import GuranteedSuccess from "../../components/guranteedSuccess/GuranteedSuccess";
import CheckPhone from "../../components/CheckPhone/CheckPhone";

function Home({ user, data, loading }) {
  const location = window.location.href;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-left">
          <div className="hero-1">
            <h1>
              স্কিল শিখুন সরাসরি শিক্ষক এর সাথে{" "}
              <span>
                <SettingsInputAntennaIcon />
              </span>{" "}
              লাইভে!
            </h1>
          </div>
          <div className="hero-2">
            <h2>
              কাজ শিখুন <span>অনলাইনে,</span> আয় করুন <span>ঘরে</span> বসে!
            </h2>
          </div>
          <div className="hero-3">
            <h3>দেশের সেরা স্কিল ডেভেলপমেন্ট প্লাটফর্মে আপনাকে স্বাগতম!</h3>
          </div>
        </div>
        {!user && (
          <div className="home-right">
            <CheckPhone />
          </div>
        )}
        <SelectCourse user={user} data={data} loading={loading} />
        <Fiveperbatch />
        <GuranteedSuccess />
        <AllCourses data={data} loading={loading} />
      </div>
    </div>
  );
}

export default Home;
