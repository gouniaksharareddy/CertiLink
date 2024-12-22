import React from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Navbar = () => {
  return (
    <header className="p-3  text-white">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none d-flex align-items-center">
          <img src="path/to/your-logo.png" alt="" style={{ height: '50px', marginRight: '10px' }} />
          <span className="h5">CERTILINK</span>
        </Link>
        <nav className="d-flex">
          <Link to="/home" className="text-white text-decoration-none mx-2 nav-link">Home</Link>
          <Link to="/about_us" className="text-white text-decoration-none mx-2 nav-link">About Us</Link>
          <Link to="/apply" className="text-white text-decoration-none mx-2 nav-link">Apply</Link>
          <Link to="/status" className="text-white text-decoration-none mx-2 nav-link">Status</Link>
          <Link to="/profile" className="text-white text-decoration-none mx-2 nav-link">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
