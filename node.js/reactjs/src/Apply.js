import React, { useState } from 'react';
import Navbar from './Navbar'; // Import the NavBar component
import axios from "axios";
import './Apply.css'; // Assuming this is where custom styles are located

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollnumber: '',
    fathername: '',
    phone: '',
    certificateType: '',
    reason: '',
  });

  const [errors, setErrors] = useState({
    rollnumber: '',
  });

  const [message, setMessage] = useState(''); // For success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific error messages as the user types
    if (name === "rollnumber") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rollnumber: '',
      }));
    }
  };

  const validateRollNumber = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/validate-user/${formData.rollnumber}`);
      return response.data.exists;
    } catch (error) {
      console.error("Error validating roll number:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isRollNumberValid = await validateRollNumber();
    if (!isRollNumberValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rollnumber: "Roll number does not exist in the database.",
      }));
      return;
    }
  
    // Ensure all required fields are included
    const applicationData = {
      name: formData.name,
      rollnumber: formData.rollnumber,
      fathername: formData.fathername,
      phone: formData.phone,
      certificateType: formData.certificateType,
      reason: formData.reason,
      status: "Not Accepted",
      submittedDate: new Date().toISOString(), // Optional, default is set in schema
    };
  
    try {
      const response = await axios.post("http://localhost:3000/applications", applicationData);
  
      if (response.status === 200 || response.status === 201) {
        setMessage("Application submitted successfully!");
        setFormData({
          name: "",
          rollnumber: "",
          fathername: "",
          phone: "",
          certificateType: "",
          reason: "",
        });

        // Hide the message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        setMessage("Failed to submit application. Please try again.");
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting application:", error.response?.data || error.message);
      setMessage("Error submitting application. Please try again later.");
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Apply for Certificate Form Section */}
      <section id="apply" className="apply-section">
        <div className="container-fluid">
          <div className="info-section">
            <h1>Apply for Certificate</h1>
            <p>
              Fill out the form below to apply for your certificate. Once your
              application is processed, you will receive a notification via SMS.
            </p>
          </div>

          <div className="form-section">
            {/* Certificate Application Form */}
            <form onSubmit={handleSubmit} className="certificate-form">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rollnumber">Roll Number:</label>
                <input
                  type="text"
                  id="rollnumber"
                  name="rollnumber"
                  value={formData.rollnumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your roll number"
                />
                {errors.rollnumber && <p className="error-message">{errors.rollnumber}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="fathername">Father Name:</label>
                <input
                  type="text"
                  id="fathername"
                  name="fathername"
                  value={formData.fathername}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Father name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="certificateType">Certificate Type:</label>
                <select
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Certificate Type</option>
                  <option value="degree">Degree Certificate</option>
                  <option value="transcript">Transcript</option>
                  <option value="migration">Migration Certificate</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason:</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter any additional requests or comments here"
                ></textarea>
              </div>

              <div className="form-group">
                <button type="submit" className="btn-primary">Submit Application</button>
              </div>
            </form>

            {/* Message Display */}
            {message && <p className="status-message">{message}</p>}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 CertiLink. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Apply;
