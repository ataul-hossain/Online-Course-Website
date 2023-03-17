import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SchoolIcon from "@mui/icons-material/School";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import PaymentsIcon from "@mui/icons-material/Payments";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <Link to={"/dashboard"} className="link s-item">
          <HomeIcon />
          <p>ড্যাশবোর্ড হোম</p>
        </Link>
        <Link to={"/dashboard/class-recordings"} className="link s-item">
          <OndemandVideoIcon />
          <p>ক্লাসের রেকর্ডিং দেখুন</p>
        </Link>
        <Link to={"/dashboard/courses"} className="link s-item">
          <SchoolIcon />
          <p>আপনার কোর্সগুলো</p>
        </Link>
        <Link to={"/dashboard/free-content"} className="link s-item">
          <LibraryAddCheckIcon />
          <p>ফ্রি কন্টেন্ট</p>
        </Link>
        <Link to={"/dashboard/payments"} className="link s-item">
          <PaymentsIcon />
          <p>লেনদেন</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
