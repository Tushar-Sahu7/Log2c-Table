import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  //no token - redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
