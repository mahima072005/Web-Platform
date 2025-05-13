
// src/Contact.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const Contact = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (Dashboard)
  };

  return (
    <div className="contact-page">
      <button className="close-button" onClick={handleGoBack}>
        <FaTimes />
      </button>
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-description">
      Need assistance with your HVAC system or have a query? Use the information below to connect with our team. We're here to help you ensure optimal performance and comfort.
      </p>

      <div className="contact-info-grid">
        {/* Chat to Us */}
        <div className="contact-card">
          <div className="contact-icon">✉</div>
          <h3 className="contact-card-title">CHAT TO US</h3>
          <p className="contact-card-text">Our friendly team is here to help.</p>
          <a href="mailto:admin1@ourHVAC.com" className="contact-email">admin@ourHVAC.com</a>
        </div>

        {/* Office */}
        <div className="contact-card">
          <div className="contact-icon">🌏</div>
          <h3 className="contact-card-title">OFFICE</h3>
          <p className="contact-card-text">Come say hello at our office HCQX.</p>
          <p className="contact-address">
            021 B wing Street, 21 Avenue C-III,<br />
            BSP,4905-90
          </p>
        </div>

        {/* Phone */}
        <div className="contact-card">
          <div className="contact-icon">🕿</div>
          <h3 className="contact-card-title">PHONE</h3>
          <p className="contact-card-text">Mon-Fri from 8am to 6pm</p>
          <p className="contact-phone">+91(9424) XXX-XXX<br/>+91(7647) XXX-XXX</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;