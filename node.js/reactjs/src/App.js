import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import AboutUs from "./AboutUs";
import Admin from "./Admin";
import Apply from "./Apply";
import Profile from "./Profile";
import StatusPage from "./StatusPage";
import Completed from "./completed"; // Import Completed component
import Pending from "./pending";     // Import Pending component
import AdminProfile from "./AdminProfile";
import Requests from "./Requests";  
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Clear localStorage on app load
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");

    // Reset state
    setIsLoggedIn(false);
    setRole("");
  }, []);

  const handleLogin = (user_id, userRole) => {
    console.log("Logging in:", { user_id, userRole }); // Debug log
    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("role", userRole);
  };

  console.log("Render: isLoggedIn:", isLoggedIn, "role:", role); // Debug log

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to={role === "admin" ? "/admin" : "/home"} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLogin={(user_id, role) => handleLogin(user_id, role)} />
            ) : (
              <Navigate to={role === "admin" ? "/admin" : "/home"} />
            )
          }
        />
        <Route
          path="/home"
          element={isLoggedIn && role !== "admin" ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isLoggedIn && role === "admin" ? <Admin /> : <Navigate to="/login" />}
        />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/completed" element={<Completed />} /> {/* New Completed route */}
        <Route path="/pending" element={<Pending />} />     {/* New Pending route */}
        <Route path="/adminprofile" element={<AdminProfile/>}/>
        <Route path="/requests" element={<Requests/>}/>
      </Routes>
    </Router>
  );
};

export default App;
