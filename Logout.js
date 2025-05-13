import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Contact.css';
import { FaTimes } from 'react-icons/fa';

const Logout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (Dashboard)
  };

  return (
    <div className="logout-page">
      <button className="close-button" onClick={handleGoBack}>
        <FaTimes />
      </button>
    </div>
  );
}
export default Logout;