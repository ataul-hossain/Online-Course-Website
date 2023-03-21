import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ user, userData, data }) => {
  return userData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
