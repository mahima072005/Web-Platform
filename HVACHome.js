

import React from 'react';
import styles from './newMain.module.css'; // Modular CSS for styling
import './fontawesome.css'; // For font-awesome icons
import { useNavigate } from 'react-router-dom';

const HVACHome = () => {
  const navigate = useNavigate();

  const openPopup = (id) => {
    const popup = document.getElementById(id);
    if (popup) {
      popup.style.display = 'flex';
    }
  };

  const closePopup = (id) => {
    const popup = document.getElementById(id);
    if (popup) {
      popup.style.display = 'none';
    }
  };

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Automatic HVAC
          <br />
          System
        </h2>
        <nav className={styles.navigation}>
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <button onClick={() => openPopup('aboutPopup')} className={styles.navButton}>
            About
          </button>
          <button onClick={() => openPopup('teamPopup')} className={styles.navButton}>
            Our Team
          </button>
          <button onClick={() => openPopup('contactPopup')} className={styles.navButton}>
            Contact Us
          </button>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <p className={styles.tagline}>
          Experience seamless climate control with our intelligent HVAC system.
        </p>
        <button className={styles.primaryButton} onClick={handleGetStarted}>
          Get Started <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
        </button>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} CSIT Dept, GGU. All rights reserved.
      </footer>

      {/* Popups */}
      <div className={styles.popupOverlay} id="aboutPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('aboutPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>About Our HVAC Project</h3>
          <p>
            Our automatic HVAC system is designed to provide optimal comfort and energy efficiency.
            We leverage cutting-edge technology to intelligently manage your heating, ventilation, and
            air conditioning needs. This project is a testament to the innovation and dedication of
            the CSIT department at GGU.
          </p>
          <p>
            We aim to create a sustainable and user-friendly solution for climate control in various
            environments, from residential homes to commercial buildings.
          </p>
        </div>
      </div>

      <div className={styles.popupOverlay} id="teamPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('teamPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>Our Team</h3>
          <p>
            This project was brought to life by a dedicated team of students and faculty from the
            CSIT Department at Guru Ghasidas Vishwavidyalaya.
          </p>
          <div className={styles.teamMember}>
            <strong>Admin 1:</strong> Mahima <br /> GGV/22/15322
          </div>
          <div className={styles.teamMember}>
            <strong>Admin 2:</strong> ABC
          </div>
          <div className={styles.teamMember}>
            <strong>Admin 3:</strong> XYZ
          </div>
          <p>
            We are passionate about creating innovative solutions and are proud to present this
            automatic HVAC system.
          </p>
        </div>
      </div>

      <div className={styles.popupOverlay} id="contactPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('contactPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>Contact Us</h3>
          <p>
            <i className={`fas fa-phone-alt ${styles.contactIcon}`}></i>{' '}
            <a href="tel:+123-456-7890" className={styles.contactLink}>
              +123-456-7890
            </a>
          </p>
          <p>
            <i className={`fas fa-envelope ${styles.contactIcon}`}></i>{' '}
            <a href="mailto:mahima07.csitggu@gmail.com" className={styles.contactLink}>
              mahima07.csitggu@gmail.com
            </a>
          </p>
          <p>
            <i className={`fas fa-map-marker-alt ${styles.contactIcon}`}></i> CSIT, GGU, Bilaspur
          </p>
          <p>
            We are here to answer any questions you may have. Feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HVACHome;
