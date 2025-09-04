import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RedirectAuthenticated = () => {
  const auth = JSON.parse(localStorage.getItem("authState"));
  const token = auth?.token;

  return token ? <Navigate to="/home" replace /> : <Outlet />;
};

export default RedirectAuthenticated;
