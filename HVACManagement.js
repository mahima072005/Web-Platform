


import React, { useState, useEffect, useCallback } from 'react';
import './HVACManagement.css';
import app from './firebaseConfig'; // Correct path to your firebaseConfig.js
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const authInstance = getAuth(app);

const HVACManagement = () => {
  // State variables
  const [coolingFanValue, setCoolingFanValue] = useState(578);
  const [heatingFanValue, setHeatingFanValue] = useState(467);
  const [ventilationFanValue, setVentilationFanValue] = useState(340);
  const [coolingPercentage, setCoolingPercentage] = useState(45);
  const [heatingPercentage, setHeatingPercentage] = useState(15);
  const [purifierPercentage, setPurifierPercentage] = useState(34);
  const [temperatureStatus, setTemperatureStatus] = useState("Hot");
  const [aqiStatus, setAqiStatus] = useState("Normal");
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coolingFanSpinning, setCoolingFanSpinning] = useState(true);
  const [heatingFanSpinning, setHeatingFanSpinning] = useState(true);

  // Table for AQI status
  const aqiTable = [
    "Good",
    "Moderate",
    "Unhealthy for Sensitive groups",
    "Unhealthy",
    "Very unhealthy",
    "Hazardous"
  ];

  // Simple pseudo-random number generator for consistency
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to close sidebar
  const closeSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Function to create local notification (keeping for now)
  const notify = (type, message) => {
    const id = Math.random().toString(36).substr(2, 10);
    const newNotification = {
      id,
      type,
      message
    };

    setNotifications(prev => [...prev, newNotification]);

    // Remove notification after 6 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 6000);
  };

  // --- NEW FUNCTION TO SEND NOTIFICATIONS TO FIRESTORE ---
  const sendNotificationToFirestore = useCallback(async (type, message, source = "HVAC System") => {
    const currentUser = authInstance.currentUser; // Get the currently logged-in user

    // Prepare the data for Firestore
    const notificationData = {
      message: message, // The notification message
      type: type,       // 'success', 'error', 'warning', 'info'
      source: source,   // Where the notification came from (e.g., "HVAC System", "Temperature Alert")
      timestamp: serverTimestamp(), // Firestore will put the current server time here
      read: false,      // New notifications are unread
      userId: currentUser ? currentUser.uid : null, // Attach user ID if logged in, or null for global/system notifications
      // link: '/dashboard/hvac' // Optional: if you want a click on notification to lead somewhere
    };

    try {
      // Add the new notification document to the 'notifications' collection in Firestore
      const docRef = await addDoc(collection(db, 'notifications'), notificationData);
      console.log(`Notification stored in Firestore with ID: ${docRef.id} - Message: ${message}`);
    } catch (error) {
      console.error("Error writing notification to Firestore: ", error);
      // You could also set an error state here to inform the user on this page if needed
    }
  }, []); // useCallback ensures this function doesn't change on every render unless dependencies change (none here)
  // --- END OF NEW FUNCTION ---

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random temperature and AQI values
      const temp = Math.floor(pseudoRandom() * (60 - 10 + 1)) + 10; // min: 10, max: 60
      const aqi = Math.floor(pseudoRandom() * (90 - 10 + 1)) + 10; // min: 10, max: 90

      // Thresholds (simulating firebase data)
      const aqiThreshold = { min: 20, max: 50 };
      const tempThreshold = { min: 20, max: 30 };

      // Update AQI status
      if (aqi > 0 && aqi <= 50) setAqiStatus(aqiTable[0]);
      else if (aqi > 50 && aqi <= 100) setAqiStatus(aqiTable[1]);
      else if (aqi > 100 && aqi <= 150) setAqiStatus(aqiTable[2]);
      else if (aqi > 150 && aqi <= 200) setAqiStatus(aqiTable[3]);
      else if (aqi > 200 && aqi <= 300) setAqiStatus(aqiTable[4]);
      else if (aqi > 301 && aqi <= 500) setAqiStatus(aqiTable[5]);

      // Handle high AQI
      if (aqi > aqiThreshold.max) {
        setVentilationFanValue(prev => prev + 50);
        setPurifierPercentage(prev => Math.min(prev + 2, 100));
        notify("warning", `AQI: ${aqi}\nNeeds purification AQI is high! Purifying initiated`);
        sendNotificationToFirestore(
          "warning", // Type of notification
          `AQI is high: ${aqi}. Air purification has been initiated.`, // Message
          "AQI Monitoring System" // Source
        );
      }

      // Handle temperature
      if (temp > tempThreshold.max) {
        setTemperatureStatus("HIGH");
        setCoolingFanValue(prev => prev + 100);
        setHeatingFanValue(prev => prev > 100 ? prev - 100 : 0);
        setCoolingPercentage(prev => Math.min(prev + 5, 100));
        setHeatingPercentage(prev => Math.max(prev - 5, 0));

        if (heatingFanValue - 100 < 0) {
          setHeatingFanSpinning(false);
        } else {
          setHeatingFanSpinning(true);
        }

        notify("error", `Temperature: ${temp}\nHigh temperature detected! Cooling initiated`);
        sendNotificationToFirestore(
          "error", // Type
          `Temperature is HIGH: ${temp}°C. Cooling system activated.`, // Message
          "Temperature Control System" // Source
        );
      }

      if (temp < tempThreshold.min) {
        setTemperatureStatus("LOW");
        setHeatingFanValue(prev => prev + 100);
        setCoolingFanValue(prev => prev > 100 ? prev - 100 : 0);
        setHeatingPercentage(prev => Math.min(prev + 5, 100));
        setCoolingPercentage(prev => Math.max(prev - 5, 0));

        if (coolingFanValue - 100 < 0) {
          setCoolingFanSpinning(false);
        } else {
          setCoolingFanSpinning(true);
        }

        notify("info", `Temperature: ${temp}\nLow temperature detected! Heating initiated`);
        sendNotificationToFirestore(
          "info", // Type
          `Temperature is LOW: ${temp}°C. Heating system activated.`, // Message
          "Temperature Control System" // Source
        );
      }
    }, 7000); // Interval of 7 seconds for example

    return () => clearInterval(interval);
  }, [sendNotificationToFirestore]); // Added sendNotificationToFirestore to the dependency array

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav_icon" onClick={toggleSidebar}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <a className="active_link" href="#">HVAC</a>
        </div>
        <div className="navbar__right">
          <a href="#">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <div className="main__container">
          {/* Main title */}
          <div className="main__title">
            <div className="main__greeting">
              <h1>Monitor Screen</h1>
              <p>HVAC mod-id : 2jfck</p>
            </div>
          </div>

          {/* Main cards */}
          <div className="main__cards">
            <div className="card">
              <div id="1010">
                <i
                  className={`fas fa-fan ${coolingFanSpinning ? 'fa-spin' : ''} fa-3x fa-fw text-lightblue`}
                  aria-hidden="true"
                ></i>
              </div>
              <div className="card_inner">
                <p className="text-primary-p">Cooling Fan</p>
                <span className="font-bold text-title" id="101">{coolingFanValue}</span>
              </div>
            </div>

            <div className="card">
              <div id="1020">
                <i
                  className={`fa fa-circle-o-notch ${heatingFanSpinning ? 'fa-spin' : ''} fa-3x fa-fw text-red`}
                  aria-hidden="true"
                ></i>
              </div>
              <div className="card_inner">
                <p className="text-primary-p">Heating Fan</p>
                <span className="font-bold text-title" id="102">{heatingFanValue}</span>
              </div>
            </div>

            <div className="card">
              <i
                className="fa fa-cog fa-spin fa-3x fa-fw text-green"
                aria-hidden="true"
              ></i>
              <div className="card_inner">
                <p className="text-primary-p">Ventillaton Fan</p>
                <span className="font-bold text-title" id="103">{ventilationFanValue}</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts">
            <div className="charts__left">
              <div className="charts__left__title">
                <div>
                  <h1>Fan Stats</h1>
                  <p>Energy Consumption Stats</p>
                </div>
                <i className="fa fa-table" aria-hidden="true"></i>
              </div>
              <div className="charts__left__cards">
                <div className="card2">
                  <h1 id="201">{coolingPercentage}%</h1>
                  <p>Cooling</p>
                </div>
                <div className="card3">
                  <h1 id="202">{heatingPercentage}%</h1>
                  <p>Heating</p>
                </div>
                <div className="card5">
                  <h1 id="203">{purifierPercentage}%</h1>
                  <p>Purifier</p>
                </div>
              </div>
            </div>

            <div className="charts__right">
              <div className="charts__right__title">
                <div>
                  <h1>System Stats</h1>
                  <p>AQI and Temperature</p>
                </div>
                <i className="fa fa-table" aria-hidden="true"></i>
              </div>

              <div className="charts__right__cards">
                <div className="card1">
                  <h1>AQI</h1>
                  <p id="403">{aqiStatus}</p>
                </div>
                <div className="card4">
                  <h1>Temperature</h1>
                  <p id="401">{temperatureStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification area (local notifications) */}
      <div id="notification-area" className="notification-area">
        {notifications.map(notification => (
          <div
            key={notification.id}
            id={notification.id}
            className={`notification ${notification.type}`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HVACManagement;