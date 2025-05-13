
// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GetStartedPage from './GetStartedPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Rooms from './Rooms';
import Dashboard from './Dashboard'; // Import the Dashboard component
import './App.css';
import Contact from './Contact';
import Chat from './Chat';
import HVACManagement from './HVACManagement';
import SensorManagement from './SensorManagement';
import ThresholdManagement from './ThresholdManagement';
import ReportSection from './ReportSection';
import Mode from './Mode';
import NotificationsPage from './NotificationsPage'; 


function App() {
  return (
   
     <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route index element={<div>Welcome to Dashboard</div>} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="chat" element={<Chat />} /> {/* Nested route for Chat */}
          <Route path="hvac" element={<HVACManagement/>} />
          <Route path="sensor" element={<SensorManagement />} />
          <Route path="threshold" element={<ThresholdManagement/>} />
          <Route path="report" element={<ReportSection/>} />
          <Route path="mode" element={<Mode />} />
          <Route path="notifications" element={<NotificationsPage />} /> 

        </Route>
      </Routes>
     </div>
    
  );
}

export default App;