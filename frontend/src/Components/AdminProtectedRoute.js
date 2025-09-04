import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const auth = JSON.parse(localStorage.getItem("authState"));
  const token = auth?.token;
  const isAdmin = auth?.user?.isAdmin;
  console.log(auth, token, isAdmin, "From AdminProtected Route");

  return token && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default AdminProtectedRoute;
