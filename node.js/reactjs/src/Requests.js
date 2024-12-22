import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Requests.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Requests = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(""); // State to store notifications

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/applications/requests?status=Not Accepted"
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/applications/requests/${id}/status`,
        { status: "pending" }
      );
      if (response.status === 200) {
        setNotification("Request approved and moved to Pending Tasks");
        setTimeout(() => setNotification(""), 3000); // Hide the notification after 3 seconds
        setApplications(applications.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error("Error approving request:", error);
      setNotification("Error approving request. Please try again.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/applications/requests/${id}/status`,
        { status: "Rejected" }
      );
      if (response.status === 200) {
        setNotification("Request rejected.");
        setTimeout(() => setNotification(""), 3000); // Hide the notification after 3 seconds
        setApplications(applications.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      setNotification("Error rejecting request. Please try again.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="requests-content">
        <h3>Requests Page</h3>
        <p>Here you can view and manage all certificate requests.</p>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="request-list">
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <div className="request-item card mb-3" key={application._id}>
                  <div className="card-body">
                    <h5 className="card-title">Request #{index + 1}</h5>
                    <p className="card-text">User ID: {application.rollnumber}</p>
                    <p className="card-text">Certificate Type: {application.certificateType}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleApprove(application._id)}  // Use _id here
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleReject(application._id)}  // Use _id here
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No new requests available.</p>
            )}
          </div>
        )}

        {/* Notification Message */}
        {notification && (
          <div className="notification-message">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
