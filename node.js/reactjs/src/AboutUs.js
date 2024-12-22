import React, { useState } from 'react';
import NavBar from './Navbar';
import './AboutUs.css';

const AboutUs = () => {
  const [isContactBoxVisible, setContactBoxVisible] = useState(false);

  const toggleContactBox = () => {
    setContactBoxVisible(!isContactBoxVisible);
  };

  return (
    <div className="about-us-page">
      <NavBar />

      <div className="about-us-container">
        {/* Introduction */}
        <section className="intro">
          <h1>CertiLink</h1>
          <p>
            CertiLink is a revolutionary platform designed to simplify the certificate application process. Our goal is to bridge the gap between students and institutions with a streamlined, technology-driven approach.
          </p>
        </section>

        {/* Two Columns: Mission & Vision */}
        <section className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To provide an intuitive and efficient solution for managing certificate applications, saving time and effort for both students and institutions.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To transform administrative processes in education with technology, enabling institutions to focus on delivering quality education.
            </p>
          </div>
        </section>

        {/* Developers Section */}
        <section className="developers">
          <h2>Meet Our Team</h2>
          <div className="bottom-card">
            <div className="developer-card">
              <p className="developer-name">Gouni Akshara Reddy</p>
              <p className="developer-role">Front-end Developer</p>
            </div>
            <div className="developer-card">
              <p className="developer-name">Kondakindi Sneha Reddy</p>
              <p className="developer-role">Back-end Developer</p>
            </div>
            <div className="developer-card">
              <p className="developer-name">Shaheeda Samreen</p>
              <p className="developer-role">Front-end & EmailJS</p>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Us Box */}
            {/* Contact Us Box */}
            <div className="contact-us-wrapper">
        {!isContactBoxVisible && (
          <button className="contact-us-button" onClick={toggleContactBox}>
            Contact Us
          </button>
        )}
        {isContactBoxVisible && (
          <div className="contact-us-box">
            <button className="close-button" onClick={toggleContactBox}>
              &times;
            </button>
            <h3>Contact Us</h3>
            <form>
              <h6>8639607318</h6>
              <h6>9000547158</h6>
              <h6>8790473720</h6>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 CertiLink. Empowering education through innovation.</p>
      </footer>
    </div>
  );
};

export default AboutUs;