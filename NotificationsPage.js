

// src/components/NotificationsPage/NotificationsPage.js
import React, { useState, useEffect, useCallback } from 'react';
import './NotificationsPage.css';
import { FaBell, FaTimes, FaSpinner, FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';

// --- Firebase Imports ---
// CORRECTED PATH: Assuming firebaseConfig.js is in src/ and this file is in src/components/NotificationsPage/
import app from './firebaseConfig'; 
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    doc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

// ... (rest of the NotificationsPage.js component code remains the same as provided in the previous "fix it" response) ...
// (NotificationIcon, NotificationsPage function, useEffect hooks, markAsRead, deleteNotification, formatTimestamp, JSX)

// Make sure the following parts from the previous "fix it" response are included below:

const NotificationIcon = ({ type }) => {
    switch (type) {
        case 'success':
            return <FaCheckCircle className="icon success" />;
        case 'error':
            return <FaExclamationCircle className="icon error" />;
        case 'warning':
            return <FaExclamationTriangle className="icon warning" />;
        case 'info':
        default:
            return <FaInfoCircle className="icon info" />;
    }
};

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(() => {
        console.log("NotificationsPage: Auth state listener attaching...");
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("NotificationsPage: User is signed in:", user.uid);
                setCurrentUser(user);
            } else {
                console.log("NotificationsPage: User is signed out.");
                setCurrentUser(null);
                setNotifications([]); 
                setIsLoading(false); 
            }
        });
        return () => {
            console.log("NotificationsPage: Auth state listener detaching.");
            unsubscribeAuth();
        };
    }, []);

    useEffect(() => {
        if (auth.currentUser === null && currentUser === null) { 
            console.log("NotificationsPage: No user logged in. Not fetching notifications.");
            setError("Please log in to view your notifications.");
            setIsLoading(false);
            setNotifications([]);
            return;
        }

        if (!currentUser && auth.currentUser) { 
            console.log("NotificationsPage: currentUser is null, waiting for auth state.");
            setIsLoading(true); 
            return;
        }
        
        if (!currentUser) { // Final check if currentUser is still null after auth init or logout
            console.log("NotificationsPage: currentUser is definitively null. Not fetching.");
            setIsLoading(false); // Ensure loading stops if no user
            return;
        }


        console.log(`NotificationsPage: Fetching notifications for user: ${currentUser.uid}`);
        setIsLoading(true);
        setError(''); 

        const notificationsRef = collection(db, 'notifications');
        const q = query(notificationsRef, where('userId', '==', currentUser.uid), orderBy('timestamp', 'desc'));

        const unsubscribeNotifications = onSnapshot(q, (querySnapshot) => {
            const fetchedNotifications = [];
            querySnapshot.forEach((doc) => {
                fetchedNotifications.push({ id: doc.id, ...doc.data() });
            });
            console.log("NotificationsPage: Fetched notifications:", fetchedNotifications.length, fetchedNotifications);
            setNotifications(fetchedNotifications);
            setIsLoading(false);
            if (fetchedNotifications.length === 0) {
                console.log("NotificationsPage: No notifications found for this query.");
            }
        }, (err) => {
            console.error("NotificationsPage: Error fetching notifications from Firestore:", err);
            setError(`Failed to load notifications. Firestore error: ${err.message}. Check console and Firestore rules.`);
            setIsLoading(false);
        });

        return () => {
            console.log("NotificationsPage: Notifications listener detaching.");
            unsubscribeNotifications();
        };
    }, [currentUser]); 

    const markAsRead = useCallback(async (id) => {
        if (!currentUser) return; 
        console.log(`NotificationsPage: Marking notification ${id} as read.`);
        try {
            const notificationRef = doc(db, 'notifications', id);
            await updateDoc(notificationRef, { read: true });
        } catch (err) {
            console.error("NotificationsPage: Error marking notification as read:", err);
        }
    }, [currentUser]);

    const deleteNotification = useCallback(async (id) => {
        if (!currentUser) return; 
        if (!window.confirm("Are you sure you want to delete this notification?")) return;
        console.log(`NotificationsPage: Deleting notification ${id}.`);
        try {
            await deleteDoc(doc(db, 'notifications', id));
        } catch (err) {
            console.error("NotificationsPage: Error deleting notification:", err);
        }
    }, [currentUser]);

    const formatTimestamp = (firebaseTimestamp) => {
        if (!firebaseTimestamp) return 'No timestamp';
        if (firebaseTimestamp instanceof Timestamp) { 
            const date = firebaseTimestamp.toDate();
            return date.toLocaleString();
        } else if (firebaseTimestamp.seconds && typeof firebaseTimestamp.nanoseconds === 'number') { 
             const date = new Timestamp(firebaseTimestamp.seconds, firebaseTimestamp.nanoseconds).toDate();
             return date.toLocaleString();
        }
        return 'Invalid date'; 
    };


    if (isLoading) {
        return (
            <div className="notifications-page loading-container">
                <FaSpinner className="spinner-icon" />
                <p>Loading notifications...</p>
            </div>
        );
    }

    if (error && currentUser) { // Only show Firestore error if we expected to fetch for a user
        return <div className="notifications-page error-container"><p>{error}</p></div>;
    }
    if (!currentUser && !isLoading) { // If not loading, and no user is set (logged out)
         return (
            <div className="notifications-page no-notifications">
                <FaBell size={50} />
                <p>Please log in to view your notifications.</p>
            </div>
        );
    }

    return (
        <div className="notifications-page">
            <div className="notifications-header">
                <FaBell className="header-icon" />
                <h1>Notifications</h1>
            </div>

            {error && <div className="notifications-page error-container" style={{minHeight: 'auto', paddingBottom: '20px'}}><p>{error}</p></div>}

            {notifications.length === 0 && !isLoading && !error && ( // Check !error here too
                <div className="no-notifications">
                    <FaBell size={50} />
                    <p>{currentUser ? "You have no new notifications." : "No notifications available."}</p>
                </div>
            )}

            <ul className="notifications-list">
                {notifications.map(notification => (
                    <li
                        key={notification.id}
                        className={`notification-item ${notification.type || 'info'} ${notification.read ? 'read' : 'unread'}`}
                    >
                        <div className="notification-icon-type">
                            <NotificationIcon type={notification.type} />
                        </div>
                        <div className="notification-content">
                            <p className="notification-message">{notification.message}</p>
                            <span className="notification-timestamp">
                                {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.source && <span className="notification-source">From: {notification.source}</span>}
                        </div>
                        <div className="notification-actions">
                            {!notification.read && currentUser && notification.userId === currentUser.uid && (
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="action-btn mark-read-btn"
                                    title="Mark as read"
                                >
                                    Mark Read
                                </button>
                            )}
                             {currentUser && notification.userId === currentUser.uid && (
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="action-btn delete-btn"
                                    title="Delete notification"
                                >
                                    <FaTimes />
                                </button>
                             )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default NotificationsPage;