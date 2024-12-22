import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, roleRequired, isLoggedIn, role }) => {
  if (!isLoggedIn) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    // Redirect to home if the user doesn't have the required role
    return <Navigate to="/home" />;
  }

  return element; // Allow access to the protected route
};

export default PrivateRoute;
