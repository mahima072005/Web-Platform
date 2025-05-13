
import React from 'react';
import { Link } from 'react-router-dom';
import './GetStartedPage.css';

function GetStartedPage() {
  return (
    <div className="get-started-page">
      <h1>Get Started</h1>
      <div className="button-container">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/signup"> {/* You'll need to create a SignupPage later */}
          <button className="signup-button">Signup</button>
        </Link>
      </div>
      <p className="system-name"> </p>
    </div>
  );
}

export default GetStartedPage;