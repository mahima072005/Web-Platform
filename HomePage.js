

import React, { useState, useEffect } from 'react';
import styles from './newMain.module.css'; // Using CSS Modules
import './fontawesome.css'; // For font-awesome icons
import { useNavigate } from 'react-router-dom';

// Placeholder for a more robust i18n solution
// In a real app, you would use a library like i18next or react-intl
const translations = {
  en: {
    hvacTitle: "HVAC Management & Monitoring Platform",
    home: "Home",
    about: "About",
    ourTeam: "Our Team",
    contactUs: "Contact Us",
    tagline: "Experience seamless climate control with our intelligent HVAC system.",
    getStarted: "Get Started",
    footerCopyright: "HVAC Management. All rights reserved.",
    aboutPopupTitle: "About Our HVAC Project",
    aboutPopupText1: "Our automatic HVAC system is designed to provide optimal comfort and energy efficiency. We leverage cutting-edge technology to intelligently manage your heating, ventilation, and air conditioning needs. This project is a testament to the innovation and dedication of the CSIT department at GGU.",
    aboutPopupText2: "We aim to create a sustainable and user-friendly solution for climate control in various environments, from residential homes to commercial buildings.",
    teamPopupTitle: "Our Team",
    admin1: "Admin 1:",
    admin2: "Admin 2:",
    admin3: "Admin 3:",
    contactPopupTitle: "Contact Us",
    contactPhone: "+91(9424) XXX-XXX",
    contactEmail: "admin@ourHVAC.com",
    contactAddress: "021 B wing Street, 21 Avenue C-III, BSP,4905-90",
    contactQuestion: "We are here to answer any questions you may have. Feel free to reach out!",
    language: "Language"
  },
  de: { // German example
    hvacTitle: "HLK-Management- und Überwachungsplattform",
    home: "Startseite",
    about: "Über uns",
    ourTeam: "Unser Team",
    contactUs: "Kontakt",
    tagline: "Erleben Sie nahtlose Klimaregelung mit unserem intelligenten HLK-System.",
    getStarted: "Loslegen",
    footerCopyright: "HLK-Management. Alle Rechte vorbehalten.",
    aboutPopupTitle: "Über unser HLK-Projekt",
    aboutPopupText1: "Unser automatisches HLK-System wurde entwickelt, um optimalen Komfort und Energieeffizienz zu bieten. Wir nutzen Spitzentechnologie, um Ihre Heizungs-, Lüftungs- und Klimatisierungsanforderungen intelligent zu verwalten. Dieses Projekt ist ein Beweis für die Innovation und das Engagement der CSIT-Abteilung an der GGU.",
    aboutPopupText2: "Unser Ziel ist es, eine nachhaltige und benutzerfreundliche Lösung für die Klimaregelung in verschiedenen Umgebungen zu schaffen, von Wohnhäusern bis hin zu Geschäftsgebäuden.",
    teamPopupTitle: "Unser Team",
    admin1: "Admin 1:",
    admin2: "Admin 2:",
    admin3: "Admin 3:",
    contactPopupTitle: "Kontaktieren Sie uns",
    contactPhone: "+91(9424) XXX-XXX",
    contactEmail: "admin@ourHVAC.com",
    contactAddress: "021 B wing Street, 21 Avenue C-III, BSP,4905-90", // Keep address in English or translate if needed
    contactQuestion: "Wir sind hier, um Ihre Fragen zu beantworten. Zögern Sie nicht, uns zu kontaktieren!",
    language: "Sprache"
  },
  // Add more languages here (e.g., es, fr)
};

const HVACHome = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language
  const [texts, setTexts] = useState(translations.en);

  useEffect(() => {
    // Update texts when language changes
    setTexts(translations[currentLanguage] || translations.en);
    // Here you would also typically set the lang attribute on the <html> tag
    // document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

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

  const handleLanguageChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    // Add more language options here
    // { code: 'es', name: 'Español' },
    // { code: 'fr', name: 'Français' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {texts.hvacTitle.split('Platform')[0]} Platform
          <br />
          {/* {texts.hvacTitle.split('Platform')[1] || ''} */} {/* This line might need adjustment based on actual title structure */}
        </h2>
        <nav className={styles.navigation}>
          <a href="/" className={styles.navLink}>
            {texts.home}
          </a>
          <button onClick={() => openPopup('aboutPopup')} className={styles.navButton}>
            {texts.about}
          </button>
          <button onClick={() => openPopup('teamPopup')} className={styles.navButton}>
            {texts.ourTeam}
          </button>
          <button onClick={() => openPopup('contactPopup')} className={styles.navButton}>
            {texts.contactUs}
          </button>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <p className={styles.tagline}>
          {texts.tagline}
        </p>
        <button className={styles.primaryButton} onClick={handleGetStarted}>
          {texts.getStarted} <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
        </button>
      </main>

      <footer className={styles.footer}>
        <div className={styles.languageSelectorContainer}>
          <label htmlFor="language-select" className={styles.languageLabel}>
            {texts.language}:{' '}
          </label>
          <select
            id="language-select"
            value={currentLanguage}
            onChange={handleLanguageChange}
            className={styles.languageSelector}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.copyrightText}>
          &copy; {new Date().getFullYear()} {texts.footerCopyright}
        </div>
      </footer>

      {/* Popups */}
      <div className={styles.popupOverlay} id="aboutPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('aboutPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>{texts.aboutPopupTitle}</h3>
          <p className={styles.popupText}>
            {texts.aboutPopupText1}
          </p>
          <p className={styles.popupText}>
            {texts.aboutPopupText2}
          </p>
        </div>
      </div>

      <div className={styles.popupOverlay} id="teamPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('teamPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>{texts.teamPopupTitle}</h3>
          <div className={styles.teamMember}>
            <strong>{texts.admin1}</strong> DZR
          </div>
          <div className={styles.teamMember}>
            <strong>{texts.admin2}</strong> ABC
          </div>
          <div className={styles.teamMember}>
            <strong>{texts.admin3}</strong> XYZ
          </div>
        </div>
      </div>

      <div className={styles.popupOverlay} id="contactPopup">
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={() => closePopup('contactPopup')}>
            &times;
          </button>
          <h3 className={styles.popupTitle}>{texts.contactPopupTitle}</h3>
          <p className={styles.contactInfo}>
            <i className={`fas fa-phone-alt ${styles.contactIcon}`}></i>{' '}
            <a href={`tel:${texts.contactPhone.replace(/\s+/g, '')}`} className={styles.contactLink}>
              {texts.contactPhone}
            </a>
          </p>
          <p className={styles.contactInfo}>
            <i className={`fas fa-envelope ${styles.contactIcon}`}></i>{' '}
            <a href={`mailto:${texts.contactEmail}`} className={styles.contactLink}>
              {texts.contactEmail}
            </a>
          </p>
          <p className={styles.contactInfo}>
            <i className={`fas fa-map-marker-alt ${styles.contactIcon}`}></i> {texts.contactAddress}
          </p>
          <p className={styles.popupText}>
            {texts.contactQuestion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HVACHome;