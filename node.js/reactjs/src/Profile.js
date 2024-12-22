import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Assuming you have a common Navbar component
import "./Profile.css";
import profileImage from './profile.jpg';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [applications, setApplications] = useState({ pending: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newDetails, setNewDetails] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      try {
        const user = JSON.parse(storedUserDetails);
        setUserDetails(user);
        setNewDetails({ ...user });
        fetchApplicationCounts(user.user_id);
      } catch (parseError) {
        console.error("Error parsing user details:", parseError);
        setError("Failed to parse user details.");
        setIsLoading(false);
      }
    } else {
      setError("No user details found. Please log in.");
      setIsLoading(false);
    }
  }, []);

  const fetchApplicationCounts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/applications/counts?rollnumber=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();

      setApplications({
        pending: data.pending || 0,
        completed: data.completed || 0,
      });
    } catch (error) {
      console.error("Error fetching application counts:", error);
      setError("Error fetching application counts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const updatedDetails = { ...userDetails, ...newDetails };

      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PUT",
        body: JSON.stringify(updatedDetails),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update profile in the database");
      }

      const updatedUser = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(updatedUser));
      setUserDetails(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setNewDetails({
      ...newDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <main className="profile-container">
        <header className="profile-header">
          <div className="profile-picture">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userDetails.name || "N/A"}</h1>
            <p className="profile-role">{userDetails.role || "Student"}</p>
          </div>
        </header>

        <section className="profile-details">
          <div className="detail-card">
            <h3>Contact Information</h3>
            {isEditing ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={newDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={newDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <p>Email: {userDetails.email}</p>
                <p>Phone: {userDetails.phone || "Not provided"}</p>
              </>
            )}
          </div>
          <div className="detail-card">
            <h3>Enrollment Information</h3>
            {isEditing ? (
              <input
                type="text"
                name="course"
                value={newDetails.course}
                onChange={handleInputChange}
                placeholder="Course"
              />
            ) : (
              <p>Course: {userDetails.course || "N/A"}</p>
            )}
            <p>Roll Number: {userDetails.user_id}</p>
          </div>
          <div className="detail-card">
            <h3>Certificates</h3>
            <p>Pending Applications: {applications.pending}</p>
            <p>Completed Applications: {applications.completed}</p>
          </div>
        </section>

        <section className="profile-actions">
          <button
            className="action-button"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </section>

        {isEditing && (
          <div className="edit-form">
            <button onClick={handleProfileUpdate}>Save Profile</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
