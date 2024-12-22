import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(""); 
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [showForgotPasswordCard, setShowForgotPasswordCard] = useState(false); 
  const [forgotPasswordUserId, setForgotPasswordUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 

    try {
      const response = await axios.post("http://localhost:3000/login", { user_id, password });

      const { role, name, phone, course, email } = response.data;

      localStorage.setItem("rollNumber", user_id);
      localStorage.setItem("userDetails", JSON.stringify({ user_id, role, name, phone, course, email }));

      onLogin(user_id, role);

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid User ID or Password");
      } else if (err.request) {
        setError("Unable to connect to the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setForgotPasswordMessage("");
    setForgotPasswordError("");

    try {
      const response = await axios.post("http://localhost:3000/forgot-password", {
        user_id: forgotPasswordUserId,
      });

      if (response.status === 200) {
        setForgotPasswordMessage("Password reset email sent successfully! Please check your email.");
        setShowForgotPasswordCard(false);
      }
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      setForgotPasswordError("Error sending reset email. Please try again.");
    }
  };

  return (
    <div>
      <div className="certilink-title">CERTILINK</div>
      <div className="container-fluid vh-100 d-flex">
        <div className="info-section" style={{ width: "65%" }}>
          <h1 className="text">Welcome to CertiLink</h1>
          <p className="mt-3 text-center">
            CertiLink simplifies the college certificate application process. Apply, track, and manage your applications effortlessly!
          </p>
          <ul className="mt-3 text-center">
            <li><strong>Easy Application:</strong> Apply from any device</li>
            <li><strong>Real-Time Tracking:</strong> Stay updated</li>
            <li><strong>Secure:</strong> Your data stays confidential</li>
            <li><strong>Notifications:</strong> Get emails when certificates are ready</li>
          </ul>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center p-5">
          <div className="login-card card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4" id="login">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="user_id" className="form-label">User ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="user_id"
                  placeholder="Enter your User ID"
                  value={user_id}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Login"}
                </button>
              </div>
            </form>
            {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
            {forgotPasswordMessage && <div className="alert alert-success mt-3 text-center">{forgotPasswordMessage}</div>}
            {forgotPasswordError && <div className="alert alert-danger mt-3 text-center">{forgotPasswordError}</div>}
            <div className="text-center mt-3">
              <small>
                <a
                  href="#"
                  className="text-decoration-none forgot-password-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPasswordCard(true);
                  }}
                >
                  Forgot password?
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>

      {showForgotPasswordCard && (
        <div className="forgot-password-card card p-4 shadow-lg mt-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h5>Forgot Password</h5>
          <label htmlFor="forgotPasswordUserId" className="form-label">Enter your User ID:</label>
          <input
            type="text"
            id="forgotPasswordUserId"
            className="form-control"
            value={forgotPasswordUserId}
            onChange={(e) => setForgotPasswordUserId(e.target.value)}
            placeholder="Enter your User ID"
          />
          <div className="d-grid mt-3">
            <button onClick={handleForgotPasswordSubmit} className="btn btn-primary">Send Email</button>
            <button onClick={() => setShowForgotPasswordCard(false)} className="btn btn-secondary mt-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
