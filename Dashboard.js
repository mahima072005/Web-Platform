// // src/Dashboard.js
// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import './Dashboard.css'; // Import the CSS file

// function Dashboard() {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const logoutHandler = () => {
//     console.log('User logged out!');
//     // Later we’ll add Firebase logout here
//   };

//   return (
//     <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Sidebar */}
//       <div className={`sidebar ${darkMode ? 'dark-mode' : ''}`}>
//         <h2 style={{ marginBottom: '20px' }}>🏠︎ Dashboard</h2>
//         <ul>
//           <li>
//             <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
//               <h4 style={{ color: 'orange', margin: 0, display: 'inline' }}>
//                 Management&nbsp;
//               </h4>
//               <br />
//               <span
//                 style={{ transition: 'all 0.3', borderRadius: '4px', padding: '4px 8px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ⚙ HVAC Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/sensor" style={{ color: '#fff', textDecoration: 'none' }} >
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ᯤ Sensor Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/threshold" style={{ color: '#fff', textDecoration: 'none' }}>
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(152, 97, 52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ⇌ Threshold Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/report" style={{ color: '#fff', textDecoration: 'none' }}>
//               <h4 style={{ color: 'orange', margin: 0, display: 'inline' }}>
//                 Services&nbsp;</h4>
//               <br />
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "orange";
//                   e.target.style.backgroundColor = "rgb(151,97,52)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ⎙ Report
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/mode" style={{ color: '#fff', textDecoration: 'none' }}>
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "orange";
//                   e.target.style.backgroundColor = "rgb(151,97,52)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ⤼ Mode
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "orange";
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 🕿 Contact
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/chat" style={{ color: '#fff', textDecoration: 'none' }}>
//               <span
//                 style={{ transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = "orange";
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 🗪 Chat
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/notifications" style={{ color: '#fff', textDecoration: 'none' }}>
//               <h4 style={{ color: 'orange', margin: 0, display: 'inline' }}>Extras&nbsp;</h4>
//               <br />
//               <span
//                 style={{
//                   color: '#fff',
//                   transition: 'all 0.3s',
//                   padding: '4px 8px',
//                   borderRadius: '4px',
//                   display: 'inline-block',
//                   marginTop: '0px',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(151, 97, 52)'; // Light orange background
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 🕭 Notifications
//               </span>
//             </Link>
//           </li>
//           <li>
//             <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
//               <span
//                 style={{ color: '#fff', transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';//light orange background
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 {darkMode ? '☀ Dark Mode' : '❂ Light Mode'}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button onClick={logoutHandler} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
//               <span
//                 style={{ color: '#fff', transition: 'all 0.3s', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '0px' }}
//                 onMouseEnter={(e) => {
//                   e.target.style.color = 'orange';
//                   e.target.style.backgroundColor = 'rgb(151,97,52)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.color = '#fff';
//                   e.target.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 ⏻ Logout
//               </span>
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import './Dashboard.css';
// import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the mobile menu

// function Dashboard() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const logoutHandler = () => {
//     console.log('User logged out!');
//     // Later we’ll add Firebase logout here
//   };

//   return (
//     <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Mobile Navigation Bar */}
//       <nav className="mobile-nav">
//         <Link to="/" className="dashboard-title">
//           🏠︎ Dashboard
//         </Link>
//         <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Sidebar (will become mobile menu) */}
//       <div className={`sidebar ${darkMode ? 'dark-mode' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
//         <h2 className="sidebar-title">🏠︎ Dashboard</h2>
//         <ul>
//           <li>
//             <Link to="/" onClick={closeMobileMenu}>
//               <h4>
//                 Management&nbsp;
//               </h4>
//               <br />
//               <span>
//                 ⚙ HVAC Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/sensor" onClick={closeMobileMenu}>
//               <span>
//                 ᯤ Sensor Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/threshold" onClick={closeMobileMenu}>
//               <span>
//                 ⇌ Threshold Management
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/report" onClick={closeMobileMenu}>
//               <h4>
//                 Services&nbsp;
//               </h4>
//               <br />
//               <span>
//                 ⎙ Report
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/mode" onClick={closeMobileMenu}>
//               <span>
//                 ⤼ Mode
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" onClick={closeMobileMenu}>
//               <span>
//                 🕿 Contact
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/chat" onClick={closeMobileMenu}>
//               <span>
//                 🗪 Chat
//               </span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/notifications" onClick={closeMobileMenu}>
//               <h4>Extras&nbsp;</h4>
//               <br />
//               <span>
//                 🕭 Notifications
//               </span>
//             </Link>
//           </li>
//           <li>
//             <button onClick={toggleTheme} className="theme-button">
//               <span>
//                 {darkMode ? '☀ Dark Mode' : '❂ Light Mode'}
//               </span>
//             </button>
//           </li>
//           <li>
//             <button onClick={logoutHandler} className="logout-button">
//               <span>
//                 ⏻ Logout
//               </span>
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import { FaBars, FaTimes, FaHome, FaCog, FaSlidersH, FaFileAlt, FaPowerOff, FaMoon, FaSun, FaEnvelope, FaComments, FaBell, FaChartBar, FaPhone, FaPhoneAlt, FaArrowAltCircleDown, FaArrowRight, FaMonero, FaModx, FaMoneyCheckAlt } from 'react-icons/fa';
// import Chat from './Chat';


// function Dashboard() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const navigate = useNavigate();


//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const logoutHandler = () => {
//     console.log('User logged out!!!');
//     // Implement actual logout logic here
//     navigate('/login');
//   };

//   return (
//     <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Mobile Navigation Bar */}
//       <nav className="mobile-nav">
//         <Link to="/" className="dashboard-title">
//           <FaHome className="icon" /> Dashboard
//         </Link>
//         <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Sidebar */}
//       <aside className={`sidebar ${darkMode ? 'dark-mode' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <Link to="/" className="sidebar-title">
//             <FaHome className="icon" /> Dashboard
//           </Link>
//         </div>
//         <ul className="sidebar-menu">
//           <li className="menu-item">
//             <div className="menu-category">Management</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard" onClick={closeMobileMenu}>
//                   <FaCog className="icon" /> HVAC Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/sensor" onClick={closeMobileMenu}>
//                   <FaSlidersH className="icon" /> Sensor Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/threshold" onClick={closeMobileMenu}>
//                   <FaChartBar className="icon" /> Threshold Management
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Services</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/report" onClick={closeMobileMenu}>
//                   <FaFileAlt className="icon" /> Report
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/mode" onClick={closeMobileMenu}>
//                   <FaMonero className="icon" /> Mode
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/contact" onClick={closeMobileMenu}>
//                   <FaPhoneAlt className="icon" /> Contact
//                 </Link>
//               </li>
//               <li className="menu-item">
//                 <Link to="/dashboard/chat" onClick={closeMobileMenu}>
//                   <FaComments className="icon" /> Chat
//                 </Link>
//                 <div className="chat-sidebars-container">
//                   <Chat/>
//                 </div>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Extras</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/notifications" onClick={closeMobileMenu}>
//                   <FaBell className="icon" /> Notifications
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item theme-toggle">
//             <button onClick={toggleTheme}>
//               {darkMode ? <><FaMoon className="icon" /> Dark Mode</> : <><FaSun className="icon" /> Light Mode</>}
//             </button>
//           </li>
//           <li className="menu-item logout">
//             <button onClick={logoutHandler}>
//               <FaPowerOff className="icon" /> Logout
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// // export default Dashboard;
// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import { FaBars, FaTimes, FaHome, FaCog, FaSlidersH, FaFileAlt, FaPowerOff, FaMoon, FaSun, FaEnvelope, FaComments, FaBell, FaChartBar, FaPhone, FaPhoneAlt, FaArrowAltCircleDown, FaArrowRight, FaMonero, FaModx, FaMoneyCheckAlt } from 'react-icons/fa';
// import Chat from './Chat'; // Import Chat component

// function Dashboard() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const logoutHandler = () => {
//     console.log('User logged out!!!');
//     // Implement actual logout logic here
//     navigate('/login');
//   };

//   return (
//     <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Mobile Navigation Bar */}
//       <nav className="mobile-nav">
//         <Link to="/" className="dashboard-title">
//           <FaHome className="icon" /> Dashboard
//         </Link>
//         <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Sidebar */}
//       <aside className={`sidebar ${darkMode ? 'dark-mode' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <Link to="/" className="sidebar-title">
//             <FaHome className="icon" /> Dashboard
//           </Link>
//         </div>
//         <ul className="sidebar-menu">
//           <li className="menu-item">
//             <div className="menu-category">Management</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard" onClick={closeMobileMenu}>
//                   <FaCog className="icon" /> HVAC Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/sensor" onClick={closeMobileMenu}>
//                   <FaSlidersH className="icon" /> Sensor Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/threshold" onClick={closeMobileMenu}>
//                   <FaChartBar className="icon" /> Threshold Management
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Services</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/report" onClick={closeMobileMenu}>
//                   <FaFileAlt className="icon" /> Report
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/mode" onClick={closeMobileMenu}>
//                   <FaMonero className="icon" /> Mode
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/contact" onClick={closeMobileMenu}>
//                   <FaPhoneAlt className="icon" /> Contact
//                 </Link>
//               </li>
//               <li className="menu-item">
//                 <Link to="/dashboard/chat" onClick={closeMobileMenu}>
//                   <FaComments className="icon" /> Chat
//                 </Link>
//                 {/* **REMOVE THIS ENTIRE DIV:** */}
//                 {/* <div className="chat-sidebars-container">
//                   <Chat/>
//                 </div> */}
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Extras</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/notifications" onClick={closeMobileMenu}>
//                   <FaBell className="icon" /> Notifications
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item theme-toggle">
//             <button onClick={toggleTheme}>
//               {darkMode ? <><FaMoon className="icon" /> Dark Mode</> : <><FaSun className="icon" /> Light Mode</>}
//             </button>
//           </li>
//           <li className="menu-item logout">
//             <button onClick={logoutHandler}>
//               <FaPowerOff className="icon" /> Logout
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <Outlet /> {/* The Chat component will be rendered here when the route is /dashboard/chat */}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
// import './Dashboard.css';
// import { FaBars, FaTimes, FaHome, FaCog, FaSlidersH, FaFileAlt, FaPowerOff, FaMoon, FaSun, FaEnvelope, FaComments, FaBell, FaChartBar, FaPhone, FaPhoneAlt, FaArrowAltCircleDown, FaArrowRight, FaMonero, FaModx, FaMoneyCheckAlt } from 'react-icons/fa';

// function Dashboard() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location =useLocation();

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const logoutHandler = () => {
//     console.log('User logged out!!!');
//     navigate('/login');
//   };

//   return (
//     <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
//       {/* Mobile Navigation Bar */}
//       <nav className="mobile-nav">
//         <Link to="/dashboard" className="dashboard-title">
//           <FaHome className="icon" /> Dashboard
//         </Link>
//         <button className="mobile-menu-button" onClick={toggleMobileMenu}>
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </nav>

//       {/* Sidebar */}
//       <aside className={`sidebar ${darkMode ? 'dark-mode' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <Link to="/dashboard" className="sidebar-title">
//             <FaHome className="icon" /> Dashboard
//           </Link>
//         </div>
//         <ul className="sidebar-menu">
//           <li className="menu-item">
//             <div className="menu-category">Management</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/hvac" onClick={closeMobileMenu}>
//                   <FaCog className="icon" /> HVAC Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/sensor" onClick={closeMobileMenu}>
//                   <FaSlidersH className="icon" /> Sensor Management
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/threshold" onClick={closeMobileMenu}>
//                   <FaChartBar className="icon" /> Threshold Management
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Services</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/report" onClick={closeMobileMenu}>
//                   <FaFileAlt className="icon" /> Report
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/mode" onClick={closeMobileMenu}>
//                   <FaMonero className="icon" /> Mode
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/contact" onClick={closeMobileMenu}>
//                   <FaPhoneAlt className="icon" /> Contact
//                 </Link>
//               </li>
//               <li className="menu-item">
//                 <Link to="/dashboard/chat" onClick={closeMobileMenu}>
//                   <FaComments className="icon" /> Chat
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item">
//             <div className="menu-category">Extras</div>
//             <ul>
//               <li>
//                 <Link to="/dashboard/notifications" onClick={closeMobileMenu}>
//                   <FaBell className="icon" /> Notifications
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li className="menu-item theme-toggle">
//             <button onClick={toggleTheme}>
//               {darkMode ? <><FaMoon className="icon" /> Dark Mode</> : <><FaSun className="icon" /> Light Mode</>}
//             </button>
//           </li>
//           <li className="menu-item logout">
//             <button onClick={logoutHandler}>
//               <FaPowerOff className="icon" /> Logout
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <Outlet /> {/* The Chat component will be rendered here */}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import { FaBars, FaTimes, FaHome, FaCog, FaSlidersH, FaFileAlt, FaPowerOff, FaMoon, FaSun, FaComments, FaChartBar, FaPhoneAlt, FaBell, FaModx } from 'react-icons/fa';

function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial theme from local storage or default to light
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update body class and local storage when theme changes
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const logoutHandler = () => {
    console.log('User logged out!!!');
    navigate('/login');
  };

  return (
    <div className={`dashboard-container`}>
      {/* Mobile Navigation Bar */}
      <nav className="mobile-nav">
        <Link to="/dashboard" className="dashboard-title">
          <FaHome className="icon" /> Dashboard
        </Link>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-title">
            <FaHome className="icon" /> Dashboard
          </Link>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <div className="menu-category">Management</div>
            <ul>
              <li>
                <Link to="/dashboard/hvac" onClick={closeMobileMenu} className={location.pathname === '/dashboard/hvac' ? 'active' : ''}>
                  <FaCog className="icon" /> HVAC Management
                </Link>
              </li>
              <li>
                <Link to="/dashboard/sensor" onClick={closeMobileMenu} className={location.pathname === '/dashboard/sensor' ? 'active' : ''}>
                  <FaSlidersH className="icon" /> Sensor Management
                </Link>
              </li>
              <li>
                <Link to="/dashboard/threshold" onClick={closeMobileMenu} className={location.pathname === '/dashboard/threshold' ? 'active' : ''}>
                  <FaChartBar className="icon" /> Threshold Management
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <div className="menu-category">Services</div>
            <ul>
              <li>
                <Link to="/dashboard/report" onClick={closeMobileMenu} className={location.pathname === '/dashboard/report' ? 'active' : ''}>
                  <FaFileAlt className="icon" /> Report
                </Link>
              </li>
              <li>
                <Link to="/dashboard/mode" onClick={closeMobileMenu} className={location.pathname === '/dashboard/mode' ? 'active' : ''}>
                  <FaModx className="icon" /> Mode
                </Link>
              </li>
              <li>
                <Link to="/dashboard/contact" onClick={closeMobileMenu} className={location.pathname === '/dashboard/contact' ? 'active' : ''}>
                  <FaPhoneAlt className="icon" /> Contact
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/dashboard/chat" onClick={closeMobileMenu} className={location.pathname === '/dashboard/chat' ? 'active' : ''}>
                  <FaComments className="icon" /> Chat
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <div className="menu-category">Extras</div>
            <ul>
              <li>
                <Link to="/dashboard/notifications" onClick={closeMobileMenu} className={location.pathname === '/dashboard/notifications' ? 'active' : ''}>
                  <FaBell className="icon" /> Notifications
                </Link>
              </li>
            </ul>
          </li>
          <li className="menu-item theme-toggle">
            <button onClick={toggleTheme}>
              {darkMode ? <><FaMoon className="icon" /> Dark Mode</> : <><FaSun className="icon" /> Light Mode</>}
            </button>
          </li>
          <li className="menu-item logout">
            <button onClick={logoutHandler}>
              <FaPowerOff className="icon" /> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet /> {/* The Chat component will be rendered here */}
      </main>
    </div>
  );
}

export default Dashboard;