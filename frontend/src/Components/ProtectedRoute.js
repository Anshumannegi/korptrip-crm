import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = JSON.parse(localStorage.getItem("authState"));
  const token = auth?.token;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
