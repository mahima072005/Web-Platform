

import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import for navigation
import './getStarted.css';

function GetStarted() {
  const navigate = useNavigate(); // ✅ initialize navigate

  const showPopup = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  const hidePopup = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  return (
    <>
      <div className="container">
        <h2>Get Started</h2>
        <button className="btn" onClick={() => navigate('/login')}>Login</button> {/* ✅ Navigate to login */}
        <button className="btn" onClick={() => alert('Signup page')}>Signup</button>
        <p>Automatic HVAC system</p>
      </div>

      <footer>
        <a onClick={() => showPopup('termsPopup')}>Terms of Use</a> |
        <a onClick={() => showPopup('privacyPopup')}>Privacy Policy</a>
      </footer>

      <div className="popup" id="termsPopup">
        <div className="popup-content">
          <span className="close" onClick={() => hidePopup('termsPopup')}>&times;</span>
          <p>Terms of Use: By using this system, you agree to our terms and conditions.</p>
        </div>
      </div>

      <div className="popup" id="privacyPopup">
        <div className="popup-content">
          <span className="close" onClick={() => hidePopup('privacyPopup')}>&times;</span>
          <p>Privacy Policy: Your data is protected and used only for system purposes.</p>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
