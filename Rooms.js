

// src/Rooms.js current
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './rooms.css'; // Assuming your CSS file is named rooms.css

function Rooms() {
  const navigate = useNavigate();
  const roomNumbers = [5145, 5146, 5147, 5148, 5149, 5150, 5151, 5152];

  const handleViewHvac = (roomNumber) => {
    console.log(`Viewing HVAC conditions for Room No-${roomNumber}`);
    // You can pass the room number as state or params if needed
    navigate('/dashboard');
  };

  return (
    <div className="rooms-page">
      <h2 className="rooms-heading">Rooms</h2>
      <div className="rooms-grid">
        {roomNumbers.map((roomNumber) => (
          <div className="room-card" key={roomNumber}>
            <div className="room-icon">🚪</div>
            <h3 className="room-number">ROOM NO-{roomNumber}</h3>
            <button
              className="view-hvac-button"
              onClick={() => handleViewHvac(roomNumber)}
            >
              View HVAC Conditions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;