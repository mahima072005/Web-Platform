import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

function SignupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigateToLogin = () => navigate('/login');

  // Navigate to next page after successful signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // You can add validation or API here before redirecting
    navigate('/get-started'); // 👈 Change this path to your desired route
  };

  return (
    <>
      <button className="btn" onClick={openModal}>Open Signup</button>

      {isModalOpen && (
        <div className="form-popup">
          <div className="form-box">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="form-details">
              <h2>Signup to create an account</h2>
              <p>Already have an account? <button onClick={navigateToLogin}>Login</button></p>
            </div>
            <div className="form-content">
              <form onSubmit={handleSignupSubmit}>
                <div className="input-field">
                  <input type="text" required />
                  <label>Username</label>
                </div>
                <div className="input-field">
                  <input type="email" required />
                  <label>Email address</label>
                </div>
                <div className="input-field">
                  <input type="password" required />
                  <label>Password</label>
                </div>
                <div className="input-field">
                  <input type="password" required />
                  <label>Confirm Password</label>
                </div>
                <button type="submit" className="form-action">Signup</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPage;
