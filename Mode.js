import React, { useState, useEffect, useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import './Mode.css';

function Mode() {
  const [mode, setMode] = useState('auto'); // 'auto' or 'manual'
  const [data, setData] = useState([]);
  const [userTemp, setUserTemp] = useState('');
  const [userAir, setUserAir] = useState('');
  const [srNo, setSrNo] = useState(1);
  const intervalRef = useRef(null);
  const waitingRef = useRef(false);
  const counterRef = useRef(0);
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    // Start auto update interval when component mounts
    if (mode === 'auto') {
      startAutoUpdate();
    }
    
    return () => {
      // Clean up interval when component unmounts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mode]);

  const startAutoUpdate = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set new interval for auto updates
    intervalRef.current = setInterval(() => {
      updateData(0, '', '', waitingRef.current);
    }, 5000);
  };

  const updateData = (check, temp, air, wait) => {
    if (wait) {
      counterRef.current++;
      if (counterRef.current >= 10) {
        counterRef.current = 0;
        waitingRef.current = false;
      }
      return;
    }
    
    const date = new Date();
    const newRow = {
      srNo: srNo,
      date: `${date.getDate()} ${months[date.getMonth()]}`,
      time: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
      temperature: check === 1 ? temp : generateRandomValue(),
      aqi: check === 1 ? air : generateRandomValue()
    };
    
    setData(prevData => [...prevData, newRow]);
    setSrNo(prevSrNo => prevSrNo + 1);
  };
  
  const generateRandomValue = () => {
    let a, b;
    while (true) {
      a = Math.floor(Math.random() * 40);
      b = Math.floor(Math.random() * 40);
      if (a > 15 && b > 15) {
        break;
      }
    }
    return a; // We're only using one value here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateData(1, userTemp, userAir, false);
    waitingRef.current = true;
    updateData(1, userTemp, userAir, true);
    
    // Reset form fields
    setUserTemp('');
    setUserAir('');
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    
    if (newMode === 'auto') {
      startAutoUpdate();
    } else {
      // Clear interval when switching to manual mode
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <div className="mode-container">
      <div className="main__title">
        <FaHome className="icon" />
        <div className="main__greeting">
          <h1>Change mode</h1>
        </div>
      </div>
      
      <div className="tabs">
        <div className="tab-buttons">
          <button 
            className={mode === 'auto' ? 'active' : ''}
            onClick={() => handleModeChange('auto')}
          >
            Auto
          </button>
          <button 
            className={mode === 'manual' ? 'active' : ''}
            onClick={() => handleModeChange('manual')}
          >
            Manual
          </button>
        </div>
        
        <div className="tab-content">
          {mode === 'auto' ? (
            <div className="auto-tab">
              <p>Data read from sensors are shown below</p>
              <div className="scroll">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Temperature</th>
                      <th>AQI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td>{row.srNo}</td>
                        <td>{row.date}</td>
                        <td>{row.time}</td>
                        <td>{row.temperature}</td>
                        <td>{row.aqi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="manual-tab">
              <h2>Enter details for Manual transmitting</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="temperature"
                    id="temp"
                    placeholder="Enter temperature you want"
                    value={userTemp}
                    onChange={(e) => setUserTemp(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="air-index"
                    id="air"
                    placeholder="Enter air quality you want"
                    value={userAir}
                    onChange={(e) => setUserAir(e.target.value)}
                  />
                  <br />
                  <button 
                    type="submit" 
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mode;