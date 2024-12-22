import React from "react";
import Sidebar from "./Sidebar"; // Ensure Sidebar path is correct
import "./adminstyles.css"; // Ensure styles are error-free

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <main className="container mt-5">
          <h1 className="text-center">Welcome to CertiLink</h1>
          <p className="text-center text-muted">
            Your one-stop solution for managing college certificates effortlessly.
          </p>

          <section className="text-section mt-4">
            <h2 className="text-center mb-4">What We Offer</h2>
            <p>
              At <strong>CertiLink</strong>, we are dedicated to providing a seamless experience 
              for students and administrators. Here’s what makes us stand out:
            </p>

            <ul className="offerings">
              <li>
                <strong>✔ Easy Applications:</strong> Apply for certificates quickly and conveniently.
              </li>
              <li>
                <strong>✔ Real-Time Tracking:</strong> Monitor the progress of your applications 24/7.
              </li>
              <li>
                <strong>✔ Secure Management:</strong> Your personal information is kept private and secure.
              </li>
              <li>
                <strong>✔ Instant Notifications:</strong> Get updates on your application status without delay.
              </li>
            </ul>

            <p>
              With CertiLink, you no longer have to worry about tedious paperwork or 
              missed deadlines. Our platform is designed to save your time and effort, 
              ensuring a smooth experience for all users.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          &copy; 2024 CertiLink. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Admin;