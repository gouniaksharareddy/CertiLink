import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./adminprofile.css";
import profileImage from './profile.jpg';
const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Fetch user details from localStorage
    const storedDetails = localStorage.getItem("userDetails");
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
  }, []);

  return (
    <div >
      <Sidebar />
      <div className="profile-content">
        <h3>Profile Page</h3>
        {userDetails ? (
          <div>
            <img src={profileImage} alt="Profile" />
            <p><strong>User ID:</strong> {userDetails.user_id}</p>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
