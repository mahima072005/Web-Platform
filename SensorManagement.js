

import React, { useState, useEffect } from 'react';
import './SensorManagement.css';
import { FaThermometerHalf, FaLeaf, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // More icons

function SensorManagement({ sensorName = "Simulated Sensor", location = "Lab 1", temperatureThresholdHigh, temperatureThresholdLow, aqiHighThreshold, aqiLowThreshold }) {
  const [temperature, setTemperature] = useState(23.0);
  const [aqi, setAqi] = useState(32);
  const [timestamp, setTimestamp] = useState(new Date());
  const [temperatureIncreasing, setTemperatureIncreasing] = useState(null); // null, true, false
  const [aqiIncreasing, setAqiIncreasing] = useState(null); // null, true, false
  const updateInterval = 5000; // 5 seconds

  const [tempStatus, setTempStatus] = useState('Normal');
  const [aqiStatus, setAqiStatus] = useState('Normal');
  const [tempColor, setTempColor] = useState('#81c784'); // Light green
  const [aqiColor, setAqiColor] = useState('#81c784'); // Light green

  const getRandomChange = (maxChange = 1) => (Math.random() - 0.5) * maxChange;
  const getRandomAqiChange = (maxChange = 3) => (Math.random() - 0.5) * maxChange;

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newTemp = temperature + (temperatureIncreasing === true ? getRandomChange() : (temperatureIncreasing === false ? -getRandomChange() : getRandomChange()));
      if (newTemp > 32) setTemperatureIncreasing(false);
      if (newTemp < 16) setTemperatureIncreasing(true);
      const tempDiff = newTemp - temperature;
      setTemperatureIncreasing(tempDiff > 0 ? true : (tempDiff < 0 ? false : null));
      setTemperature(parseFloat(newTemp.toFixed(1)));

      let newAqi = aqi + (aqiIncreasing === true ? getRandomAqiChange() : (aqiIncreasing === false ? -getRandomAqiChange() : getRandomAqiChange()));
      if (newAqi > 80) setAqiIncreasing(false);
      if (newAqi < 10) setAqiIncreasing(true);
      const aqiDiff = newAqi - aqi;
      setAqiIncreasing(aqiDiff > 0 ? true : (aqiDiff < 0 ? false : null));
      setAqi(Math.round(newAqi));

      setTimestamp(new Date());
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [temperature, aqi, temperatureIncreasing, aqiIncreasing]);

  useEffect(() => {
    if (temperature > temperatureThresholdHigh) {
      setTempStatus('High');
      setTempColor('#e57373'); // Red
    } else if (temperature < temperatureThresholdLow) {
      setTempStatus('Low');
      setTempColor('#64b5f6'); // Blue
    } else {
      setTempStatus('Normal');
      setTempColor('#81c784'); // Green
    }
  }, [temperature, temperatureThresholdHigh, temperatureThresholdLow]);

  useEffect(() => {
    if (aqi > aqiHighThreshold) {
      setAqiStatus('High');
      setAqiColor('#e57373'); // Red
    } else if (aqi < aqiLowThreshold) {
      setAqiStatus('Low');
      setAqiColor('#64b5f6'); // Blue
    } else {
      setAqiStatus('Normal');
      setAqiColor('#81c784'); // Green
    }
  }, [aqi, aqiHighThreshold, aqiLowThreshold]);

  return (
    <div className="sensor-management-container-pro">
      <div className="monitor-header">
        <h2>{sensorName}</h2>
        <p className="location">Location: {location}</p>
        <p className="timestamp">Updated: {timestamp.toLocaleString()}</p>
      </div>

      <div className="data-grid">
        <div className={`data-card temperature ${tempStatus.toLowerCase()}`}>
          <div className="card-header">
            <h3>Temperature</h3>
            <FaThermometerHalf className="icon" />
          </div>
          <div className="data-value-container">
            <span className="data-value">{temperature}</span>
            <span className="unit">°C</span>
            {temperatureIncreasing === true && <FaArrowUp className="trend-icon up" />}
            {temperatureIncreasing === false && <FaArrowDown className="trend-icon down" />}
          </div>
          <p className="status">Status: <span className={tempStatus.toLowerCase()}>{tempStatus}</span></p>
          <div className="threshold-info">
            <span className="high-threshold">High: {temperatureThresholdHigh}°C</span>
            <span className="low-threshold">Low: {temperatureThresholdLow}°C</span>
          </div>
        </div>

        <div className={`data-card aqi ${aqiStatus.toLowerCase()}`}>
          <div className="card-header">
            <h3>Air Quality Index</h3>
            <FaLeaf className="icon" />
          </div>
          <div className="data-value-container">
            <span className="data-value">{aqi}</span>
            <span className="unit">AQI</span>
            {aqiIncreasing === true && <FaArrowUp className="trend-icon up" />}
            {aqiIncreasing === false && <FaArrowDown className="trend-icon down" />}
          </div>
          <p className="status">Status: <span className={aqiStatus.toLowerCase()}>{aqiStatus}</span></p>
          <div className="threshold-info">
            <span className="high-threshold">High: {aqiHighThreshold}</span>
            <span className="low-threshold">Low: {aqiLowThreshold}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorManagement;