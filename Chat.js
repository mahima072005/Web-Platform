
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.css'; // Ensure you have this CSS file styled
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'; // Added FaSpinner for loading

// --- Firebase Imports ---
import app from './firebaseConfig'; // Your initialized Firebase app
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot, // For real-time updates
  serverTimestamp, // Consistent timestamp
  Timestamp // To work with Firestore Timestamps
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // To get the current user

// --- Initialize Firebase Services ---
const db = getFirestore(app);
const auth = getAuth(app);

// --- Firestore Collection Reference ---
// Using a single 'messages' collection for simplicity.
// For multiple chat rooms, you'd use a dynamic collection name/path.
const messagesCollectionRef = collection(db, 'messages');

const Chat = () => {
  // --- State Variables ---
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]); // Messages will be loaded from Firebase
  const [userId, setUserId] = useState(null); // Current logged-in user's ID
  const [userEmail, setUserEmail] = useState(null); // Current logged-in user's email (optional)
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial message fetch
  const [isSending, setIsSending] = useState(false); // Loading state for sending message
  const [error, setError] = useState(''); // Error state

  const navigate = useNavigate();
  const chatDisplayRef = useRef(null); // Ref for scrolling

  // --- Get Current User ---
  useEffect(() => {
    setIsLoading(true); // Start loading when checking auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email); // Store email if available
        console.log("User logged in:", user.uid, user.email);
      } else {
        setUserId(null);
        setUserEmail(null);
        console.log("User logged out, redirecting...");
        // Optional: Redirect if user is not logged in
        // navigate('/login');
      }
      // Don't stop loading here, wait for messages listener
    });
    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, [navigate]); // Added navigate as dependency

  // --- Fetch Messages in Real-Time ---
  useEffect(() => {
    // Only set up listener if user ID is known
    if (!userId) {
        setIsLoading(false); // Stop loading if no user
        setMessages([]); // Clear messages if user logs out
        return;
    }

    setIsLoading(true); // Ensure loading is true when setting up listener
    setError(''); // Clear previous errors

    // Create a query to get messages ordered by creation time
    const q = query(messagesCollectionRef, orderBy('createdAt', 'asc')); // Order by timestamp ascending

    // Set up the real-time listener
    const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetchedMessages);
      setIsLoading(false); // Stop loading once messages are fetched/updated
      console.log("Messages fetched/updated:", fetchedMessages.length);
    }, (err) => {
        // Handle errors during listener setup or updates
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try refreshing.");
        setIsLoading(false); // Stop loading on error
    });

    // Cleanup message listener on unmount or when userId changes
    return () => unsubscribeMessages();
  }, [userId]); // Rerun effect when userId changes

  // --- Scroll to Bottom ---
  useEffect(() => {
    if (chatDisplayRef.current) {
      // Scroll to the bottom whenever messages change
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]); // Dependency on messages array

  // --- Format Timestamp ---
  const formatTime = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      // Convert Firestore Timestamp to JS Date object
      const date = timestamp.toDate();
      // Format time as HH:MM (24-hour format)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    // Fallback for potentially old data or if timestamp is missing
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };


  // --- Send Message Handler ---
  const handleSendMessage = async () => {
    // Prevent sending empty messages or if not logged in or while already sending
    if (newMessage.trim() === '' || !userId || isSending) {
      return;
    }

    setIsSending(true); // Indicate sending process
    setError(''); // Clear previous errors

    // Prepare message data for Firestore
    const messageData = {
      text: newMessage.trim(),
      createdAt: serverTimestamp(), // Use server timestamp for consistency
      senderId: userId,
      senderEmail: userEmail || 'Anonymous' // Include email or fallback
    };

    try {
      // Add the new message document to the 'messages' collection
      await addDoc(messagesCollectionRef, messageData);
      console.log("Message sent successfully:", messageData.text);
      setNewMessage(''); // Clear the input field *after* successful send
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      // Optionally, don't clear the input if sending failed
    } finally {
      setIsSending(false); // Finish sending process
    }
  };

  // --- Input Change Handler ---
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  // --- Close Chat Handler ---
  const handleCloseChat = () => {
    // Navigate back or to a specific route like dashboard
    navigate(-1); // Go back to the previous page
    // navigate('/dashboard'); // Or navigate to dashboard
  };

  // --- Render Component ---
  return (
    // Added class for potential styling based on loading/error state
    <div className={`chat-container-animated ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`}>
      <div className="chat-header-animated">
        <h2>Chat Section</h2>
        {/* Display loading or error status */}
        {isLoading && <span className="chat-status">Loading messages... <FaSpinner className="spinner-icon"/></span>}
        {error && <span className="chat-status error-message">{error}</span>}
      </div>

      <div className="chat-display-animated" ref={chatDisplayRef}>
        {/* Display messages */}
        {messages.map((msg) => (
          <div
            key={msg.id} // Use Firestore document ID as key
            // Determine if message was sent by the current user
            className={`message-animated ${msg.senderId === userId ? 'sent' : 'received'}`}
          >
            {/* Optionally display sender email for received messages */}
            {/* {msg.senderId !== userId && <span className="sender-email">{msg.senderEmail}</span>} */}
            <p className="message-text-animated">{msg.text}</p>
            {/* Format and display the timestamp */}
            <span className="message-time-animated">{msg.createdAt ? formatTime(msg.createdAt) : '...'}</span>
          </div>
        ))}
         {/* Show indicator if sending */}
         {isSending && <div className="message-animated sending"><FaSpinner className="spinner-icon"/></div>}
      </div>

      <div className="chat-input-area-animated">
        <input
          type="text"
          className="chat-input-animated"
          placeholder={userId ? "Type here..." : "Please log in to chat"}
          value={newMessage}
          onChange={handleInputChange}
          // Send message on Enter key press
          onKeyPress={(event) => event.key === 'Enter' && handleSendMessage()}
          // Disable input if not logged in or currently sending
          disabled={!userId || isSending || isLoading}
        />
        <button
          className="chat-send-button-animated"
          onClick={handleSendMessage}
          // Disable button if no input, not logged in, or sending
          disabled={!newMessage.trim() || !userId || isSending || isLoading}
        >
          {/* Show spinner if sending, otherwise show paper plane */}
          {isSending ? <FaSpinner className="spinner-icon" /> : <FaPaperPlane />}
        </button>
      </div>

      {/* Close Chat Button */}
      <button className="chat-close-button-animated" onClick={handleCloseChat}>
        Close Chat
      </button>
    </div>
  );
};

export default Chat;
// ```

// **Explanation of Changes:**

// 1.  **Firebase Imports:** Added imports for Firestore functions (`getFirestore`, `collection`, `addDoc`, `query`, `orderBy`, `onSnapshot`, `serverTimestamp`, `Timestamp`) and Auth (`getAuth`, `onAuthStateChanged`).
// 2.  **Initialization:** Initialized Firestore (`db`) and Auth (`auth`).
// 3.  **Collection Reference:** Defined `messagesCollectionRef` pointing to the `messages` collection in Firestore.
// 4.  **State:**
//     * `messages`: Now initialized as empty, will be filled from Firestore.
//     * `userId`, `userEmail`: To store the current user's info.
//     * `isLoading`, `isSending`, `error`: Added for better UI feedback during loading and sending.
// 5.  **Get User (`useEffect`):** Listens for authentication changes using `onAuthStateChanged` to set `userId` and `userEmail`. Handles the case where the user might log out.
// 6.  **Fetch Messages (`useEffect`):**
//     * Runs when `userId` changes.
//     * Sets up a real-time listener (`onSnapshot`) on the `messages` collection, ordered by `createdAt`.
//     * When data changes in Firestore, it updates the `messages` state.
//     * Includes loading (`isLoading`) and error (`error`) handling.
//     * Crucially, it includes a cleanup function (`return () => unsubscribeMessages();`) to stop listening when the component unmounts or the user logs out, preventing memory leaks.
// 7.  **Scroll to Bottom (`useEffect`):** Remains largely the same, but now depends on the `messages` state populated by Firestore.
// 8.  **Format Time:** Added a `formatTime` helper function to correctly format the `Timestamp` object received from Firestore into a readable HH:MM string.
// 9.  **`handleSendMessage` (Async):**
//     * Now an `async` function.
//     * Checks if the user is logged in (`userId`) and not already sending (`isSending`).
//     * Sets `isSending` to `true`.
//     * Creates `messageData` including `text`, `senderId`, `senderEmail`, and `createdAt: serverTimestamp()`.
//     * Uses `await addDoc(messagesCollectionRef, messageData)` to save the message to Firestore.
//     * **Crucially, it no longer updates the local `messages` state directly.** The `onSnapshot` listener will automatically pick up the new message from Firestore and update the state.
//     * Includes `try...catch` for error handling and `finally` to reset `isSending`.
// 10. **Rendering:**
//     * Displays loading/error status in the header.
//     * Uses `msg.id` (Firestore document ID) as the `key` for list items.
//     * Determines 'sent' vs 'received' by comparing `msg.senderId` with the current `userId`.
//     * Calls `formatTime` to display the message time from `msg.createdAt`.
//     * Disables input/button when loading, sending, or not logged in.
//     * Shows a spinner in the send button when `isSending` is true.

// Now, your chat component will load previous messages from the `messages` collection in Firestore, display new messages in real-time as they are added by any user, and save the messages sent by the current user to Firestore. Remember to check your Firestore security rules to ensure users can read and write to the `messages` collection appropriate