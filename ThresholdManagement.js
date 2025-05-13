


//
import React, { useState, useEffect } from 'react';
import './ThresholdManagement.css'; // Your CSS remains the same
import app from './firebaseConfig'; // IMPORTANT: Adjust this path to correctly point to your firebaseConfig.js file
import { getDatabase, ref, onValue, update } from "firebase/database";

// Initialize Firebase Database instance
const db = getDatabase(app);

function ThresholdManagement() {
  const [temperatureMode, setTemperatureMode] = useState('auto');
  const [aqiMode, setAqiMode] = useState('auto');
  const [temperatureThresholdHigh, setTemperatureThresholdHigh] = useState(75);
  const [temperatureThresholdLow, setTemperatureThresholdLow] = useState(60);
  const [aqiThresholdHigh, setAqiThresholdHigh] = useState(75);
  const [aqiThresholdLow, setAqiThresholdLow] = useState(15);

  // Fetch initial threshold values from Firebase when component mounts
  useEffect(() => {
    const tempRef = ref(db, 'Threshold/Temperature');
    const aqRef = ref(db, 'Threshold/AirQuality');

    // Listener for temperature thresholds
    const unsubscribeTemp = onValue(tempRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTemperatureThresholdLow(data.min);
        setTemperatureThresholdHigh(data.max);
      } else {
        console.log("No temperature data available");
        // Optionally set to default or handle error
      }
    }, (error) => {
      console.error("Error loading temperature threshold data:", error);
      alert("Failed to load temperature threshold data. Please check your connection and console.");
    });

    // Listener for AQI thresholds
    const unsubscribeAqi = onValue(aqRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAqiThresholdLow(data.min);
        setAqiThresholdHigh(data.max);
      } else {
        console.log("No AQI data available");
        // Optionally set to default or handle error
      }
    }, (error) => {
      console.error("Error loading AQI threshold data:", error);
      alert("Failed to load AQI threshold data. Please check your connection and console.");
    });

    // Cleanup listeners when component unmounts
    return () => {
      unsubscribeTemp();
      unsubscribeAqi();
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // loadThresholdData is now handled by useEffect

  const handleTemperatureModeChange = (event) => {
    setTemperatureMode(event.target.value);
  };

  const handleAqiModeChange = (event) => {
    setAqiMode(event.target.value);
  };

  const validateTemperatureInput = (value, isHigh) => {
    const numValue = parseInt(value, 10);

    if (numValue === null || numValue === 0 || isNaN(numValue)) {
      alert("Input again, This data is invalid ❌");
      return false;
    } else if (numValue < 5) {
      alert("Don't you think it would be chilly 🤧");
      return false;
    } else if (numValue > 45) {
      alert("Don't try to turn it into oven 😨");
      return false;
    }

    if (!isHigh && numValue >= temperatureThresholdHigh) {
      alert("Low threshold must be less than high threshold");
      return false;
    }
    if (isHigh && numValue <= temperatureThresholdLow) {
      alert("High threshold must be greater than low threshold");
      return false;
    }
    return true;
  };

  const validateAqiInput = (value, isHigh) => {
    const numValue = parseInt(value, 10);

    if (numValue === null || numValue < 0 || isNaN(numValue)) {
      alert("Input again, This data is invalid ❎");
      return false;
    } else if (numValue > 100) {
      alert("It can trouble some sensitive people 😷");
      return false;
    }

    if (!isHigh && numValue >= aqiThresholdHigh) {
      alert("Low threshold must be less than high threshold");
      return false;
    }
    if (isHigh && numValue <= aqiThresholdLow) {
      alert("High threshold must be greater than low threshold");
      return false;
    }
    return true;
  };

  const handleTemperatureHighChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setTemperatureThresholdHigh(value);
  };

  const handleTemperatureLowChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setTemperatureThresholdLow(value);
  };

  const handleAqiHighChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setAqiThresholdHigh(value);
  };

  const handleAqiLowChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setAqiThresholdLow(value);
  };

  const updateFirebaseThreshold = async (type, level, value) => {
    const path = `Threshold/${type}`;
    try {
      await update(ref(db, path), {
        [level]: value
      });
      // console.log(`${type} ${level} threshold updated successfully to ${value}`);
    } catch (error) {
      console.error(`Error updating ${type} ${level} threshold:`, error);
      alert("Failed to update threshold. Please check your connection and console.");
    }
  };

  const updateTemperatureLow = () => {
    const newValue = prompt("Please enter your threshold", temperatureThresholdLow);
    if (newValue !== null) {
      const parsedValue = parseInt(newValue, 10);
      if (validateTemperatureInput(parsedValue, false)) {
        setTemperatureThresholdLow(parsedValue);
        updateFirebaseThreshold('Temperature', 'min', parsedValue);
      }
    }
  };

  const updateTemperatureHigh = () => {
    const newValue = prompt("Please enter your threshold", temperatureThresholdHigh);
    if (newValue !== null) {
      const parsedValue = parseInt(newValue, 10);
      if (validateTemperatureInput(parsedValue, true)) {
        setTemperatureThresholdHigh(parsedValue);
        updateFirebaseThreshold('Temperature', 'max', parsedValue);
      }
    }
  };

  const updateAqiLow = () => {
    const newValue = prompt("Please enter your threshold", aqiThresholdLow);
    if (newValue !== null) {
      const parsedValue = parseInt(newValue, 10);
      if (validateAqiInput(parsedValue, false)) {
        setAqiThresholdLow(parsedValue);
        updateFirebaseThreshold('AirQuality', 'min', parsedValue);
      }
    }
  };

  const updateAqiHigh = () => {
    const newValue = prompt("Please enter your threshold", aqiThresholdHigh);
    if (newValue !== null) {
      const parsedValue = parseInt(newValue, 10);
      if (validateAqiInput(parsedValue, true)) {
        setAqiThresholdHigh(parsedValue);
        updateFirebaseThreshold('AirQuality', 'max', parsedValue);
      }
    }
  };

  const handleUpdateThresholds = async () => {
    try {
      let tempUpdates = {};
      let aqiUpdates = {};
      let updatesToPerform = false;

      if (temperatureMode === 'manual') {
        if (!validateTemperatureInput(temperatureThresholdLow, false) ||
            !validateTemperatureInput(temperatureThresholdHigh, true)) {
          return;
        }
        tempUpdates = {
          min: temperatureThresholdLow,
          max: temperatureThresholdHigh
        };
        await update(ref(db, 'Threshold/Temperature'), tempUpdates);
        updatesToPerform = true;
      }

      if (aqiMode === 'manual') {
        if (!validateAqiInput(aqiThresholdLow, false) ||
            !validateAqiInput(aqiThresholdHigh, true)) {
          return;
        }
        aqiUpdates = {
          min: aqiThresholdLow,
          max: aqiThresholdHigh
        };
        await update(ref(db, 'Threshold/AirQuality'), aqiUpdates);
        updatesToPerform = true;
      }
      if(updatesToPerform || (temperatureMode === 'auto' && aqiMode === 'auto')) {
        // If only auto mode, it implies we are just confirming current values,
        // or if manual updates were made.
        alert('Thresholds Updated Successfully!');
      } else if (!updatesToPerform && (temperatureMode === 'manual' || aqiMode === 'manual')){
        // This case should ideally be caught by validation returns, but as a fallback.
        alert('No valid manual changes to update.');
      } else {
        alert('Modes are set to Auto. No manual updates applied. Current values are from database.');
      }

    } catch (error) {
      console.error("Error updating thresholds:", error);
      alert("Failed to update thresholds. Please check your connection and console.");
    }
  };

  return (
    <div className="threshold-management-container">
      <div className="navbar">
        <div className="navbar__left">
          <a className="active_link">THRESHOLD</a>
        </div>
        <div className="navbar__right">
          <a>
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <h2 className="page-title">Threshold Management</h2>

      <div className="threshold-group">
        <h3>
          TEMPERATURE
          <i className="fa fa-thermometer-quarter fa-lg text-red" aria-hidden="true"></i>
        </h3>
        <div className="mode-switch">
          <label>Mode:</label>
          <select value={temperatureMode} onChange={handleTemperatureModeChange}>
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        {temperatureMode === 'manual' && (
          <>
            <div className="threshold-item">
              <label htmlFor="tempLow">Low Threshold:</label>
              <input
                type="number"
                id="tempLow"
                value={temperatureThresholdLow}
                onChange={handleTemperatureLowChange}
              />
              <span>°C</span>
              <button className="threshold-edit-btn" onClick={updateTemperatureLow}>
                Edit
              </button>
            </div>
            <div className="threshold-item">
              <label htmlFor="tempHigh">High Threshold:</label>
              <input
                type="number"
                id="tempHigh"
                value={temperatureThresholdHigh}
                onChange={handleTemperatureHighChange}
              />
              <span>°C</span>
              <button className="threshold-edit-btn" onClick={updateTemperatureHigh}>
                Edit
              </button>
            </div>
          </>
        )}
        {temperatureMode === 'auto' && (
          <div className="threshold-display">
            <div className="threshold-item">
              <label>Low Threshold:</label>
              <span>{temperatureThresholdLow} °C (Auto)</span>
              <button className="threshold-edit-btn" onClick={updateTemperatureLow}>
                Edit
              </button>
            </div>
            <div className="threshold-item">
              <label>High Threshold:</label>
              <span>{temperatureThresholdHigh} °C (Auto)</span>
              <button className="threshold-edit-btn" onClick={updateTemperatureHigh}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="threshold-group">
        <h3>
          Air Quality Index (AQI)
          <i className="fas fa-fan fa-lg text-lightblue" aria-hidden="true"></i>
        </h3>
        <div className="mode-switch">
          <label>Mode:</label>
          <select value={aqiMode} onChange={handleAqiModeChange}>
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        {aqiMode === 'manual' && (
          <>
            <div className="threshold-item">
              <label htmlFor="aqiLow">Low Threshold:</label>
              <input
                type="number"
                id="aqiLow"
                value={aqiThresholdLow}
                onChange={handleAqiLowChange}
              />
              <button className="threshold-edit-btn" onClick={updateAqiLow}>
                Edit
              </button>
            </div>
            <div className="threshold-item">
              <label htmlFor="aqiHigh">High Threshold:</label>
              <input
                type="number"
                id="aqiHigh"
                value={aqiThresholdHigh}
                onChange={handleAqiHighChange}
              />
              <button className="threshold-edit-btn" onClick={updateAqiHigh}>
                Edit
              </button>
            </div>
          </>
        )}
        {aqiMode === 'auto' && (
          <div className="threshold-display">
            <div className="threshold-item">
              <label>Low Threshold:</label>
              <span>{aqiThresholdLow} (Auto)</span>
              <button className="threshold-edit-btn" onClick={updateAqiLow}>
                Edit
              </button>
            </div>
            <div className="threshold-item">
              <label>High Threshold:</label>
              <span>{aqiThresholdHigh} (Auto)</span>
              <button className="threshold-edit-btn" onClick={updateAqiHigh}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="update-button" onClick={handleUpdateThresholds}>
        Update Thresholds
      </button>
    </div>
  );
}

export default ThresholdManagement;