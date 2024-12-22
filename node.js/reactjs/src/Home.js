import React from 'react';
import Navbar from './Navbar'; // Import the NavBar component
import './Home.css'; // Assuming you have home.css for custom styles

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Include the NavBar component here */}

      {/* Main Content Section */}
      <main className="container mt-5">
        <h1 className="text-center">Welcome to CertiLink</h1>
        <p className="text-center text-muted">Your go-to platform for managing college certificates seamlessly.</p>

        <div className="row mt-4">
          {/* Left Section as Card */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">What We Offer</h2>
            <div className="card left-card">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li><strong>✔ Easy Applications:</strong> Apply for your certificates with just a few clicks.</li>
                  <li><strong>✔ Real-Time Tracking:</strong> Monitor the status of your applications at any time.</li>
                  <li><strong>✔ Secure Management:</strong> Your personal information is safe with us.</li>
                  <li><strong>✔ Notifications:</strong> Get timely alerts about your application status.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section with Rectangular Boxes */}
          <div className="col-md-6 right-section">
            <h2 className="text-center">Why Choose CertiLink?</h2>

            <div className="box-container">
              <div className="box">
                <h5>User-Friendly Interface</h5>
                <p>Our platform is designed to be intuitive and accessible for all users.</p>
              </div>
              <div className="box">
                <h5>Dedicated Support</h5>
                <p>We offer comprehensive support to ensure a smooth experience.</p>
              </div>
              <div className="box">
                <h5>Community Feedback</h5>
                <p>Your feedback is valuable to us, helping improve CertiLink continuously.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-light text-center p-4 mt-5">
        <p>&copy; 2024 CertiLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
