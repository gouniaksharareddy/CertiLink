import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import Navbar component
import './StatusPage.css';
import axios from 'axios';

const StatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch applications from the backend on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Retrieve the logged-in user's roll number from localStorage
        const loggedInUserRollNumber = localStorage.getItem('rollNumber');
        console.log('Roll number being sent:', loggedInUserRollNumber);

        if (!loggedInUserRollNumber) {
          setError('No roll number found for the logged-in user.');
          setIsLoading(false);
          return;
        }

        // Fetch applications filtered by the user's roll number
        const response = await axios.get(
          `http://localhost:3000/applications`,
          { params: { rollnumber: loggedInUserRollNumber } } // Send rollnumber as a query parameter
        );

        console.log('Applications fetched:', response.data); // Debug log

        if (response.data && response.data.length > 0) {
          setApplications(response.data);
        } else {
          setError('No applications found for this roll number.');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Error fetching applications: ' + (error.response?.data?.message || 'Please try again later.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      {/* Include Navbar */}
      <Navbar />

      <main className="container mt-5">
        <h1 className="mb-4 text-center">Application Status</h1>

        {/* Application Status Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Certificate Type</th>
                <th>Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-center">{error}</td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((app, index) => (
                  <tr key={index}>
                    <td>{ `${index + 1}`}</td>
                    <td>{app.certificateType}</td>
                    <td>{app.status}</td>
                    <td>{new Date(app.submittedDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Notification Section */}
        <div className="mt-4 alert alert-info" role="alert">
          <strong>Important Notice:</strong> Please check your email for updates
          regarding your application status. If you have any questions, feel
          free to contact support.
        </div>
      </main>
    </div>
  );
};

export default StatusPage;