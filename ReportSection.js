
 // update
import React, { useState, useCallback, useEffect } from 'react';
import './ReportSection.css'; // Make sure this CSS file exists and is styled
import { FaTimes, FaCloudUploadAlt, FaFile, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

// --- Firebase Imports ---
import app from './firebaseConfig'; // Your initialized Firebase app
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // To get the current user

// --- Initialize Firebase Services ---
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

function ReportSection({ onClose }) {
  // --- State Variables ---
  const [uploadedFile, setUploadedFile] = useState(null); // The file object selected by the user
  const [reportName, setReportName] = useState(''); // Input for report title
  const [emailId, setEmailId] = useState(''); // Input for user's email
  const [reportContent, setReportContent] = useState(''); // Textarea for report content
  const [isSaving, setIsSaving] = useState(false); // Loading state during save operation
  const [isSaved, setIsSaved] = useState(false); // State to show the success message
  const [saveError, setSaveError] = useState(''); // State to hold any error messages
  const [userId, setUserId] = useState(null); // State to store the logged-in user's ID

  // --- Effect to get current user ---
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserId(user.uid); // Store the user's unique ID
        // Optionally pre-fill email if user is logged in and email is available
        if (user.email && !emailId) {
             setEmailId(user.email);
        }
      } else {
        // User is signed out
        setUserId(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [emailId]); // Rerun effect if emailId changes (to avoid overwriting manual input)


  // --- Dropzone Configuration ---
  const onDrop = useCallback(acceptedFiles => {
    // Handle file drop event
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]); // Set the first accepted file
      setSaveError(''); // Clear previous errors when a new file is dropped
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Allow only single file upload
    // You can add accept prop here for specific file types, e.g., accept: 'image/*, application/pdf'
  });

  // --- Event Handlers ---
  const handleBrowseClick = (event) => {
    // Prevent dropzone activation when clicking the button inside it
    event.stopPropagation();
    // Trigger the hidden file input click programmatically
    document.getElementById('file-upload-input').click();
  };

  const handleFileChange = (event) => {
    // Handle file selection via the browse button
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
      setSaveError(''); // Clear previous errors
    }
  };

  const handleSaveReport = async () => {
    // --- Validation ---
    if (!reportName.trim() && !reportContent.trim() && !uploadedFile) {
      setSaveError('Please enter a report title, content, or upload a file.');
      return;
    }
     if (!emailId.trim()) { // Basic email check
         setSaveError('Please enter your email address.');
         return;
     }
     // More robust email validation could be added here if needed

    setIsSaving(true); // Start loading indicator
    setSaveError(''); // Clear previous errors
    setIsSaved(false); // Reset saved state

    let fileURL = null; // Variable to store the uploaded file's URL

    try {
      // --- 1. Upload File if it exists ---
      if (uploadedFile) {
        // Create a unique path in Firebase Storage
        // Example: reports/userId/timestamp_filename or reports/anonymous/timestamp_filename
        const filePath = `reports/${userId || 'anonymous'}/${Date.now()}_${uploadedFile.name}`;
        const storageRef = ref(storage, filePath);

        console.log(`Uploading file to: ${filePath}`);
        // Upload the file
        const snapshot = await uploadBytes(storageRef, uploadedFile);
        console.log('File uploaded successfully!', snapshot);

        // Get the download URL
        fileURL = await getDownloadURL(snapshot.ref);
        console.log('File available at:', fileURL);
      }

      // --- 2. Prepare Data for Firestore ---
      const reportData = {
        reportName: reportName.trim(),
        emailId: emailId.trim(),
        reportContent: reportContent.trim(),
        fileURL: fileURL, // This will be null if no file was uploaded
        createdAt: serverTimestamp(), // Use Firestore server timestamp
        userId: userId, // Store the user ID (will be null if not logged in)
      };

      // --- 3. Save Data to Firestore ---
      console.log('Saving report data to Firestore:', reportData);
      // Add a new document with an auto-generated ID to the "reports" collection
      const docRef = await addDoc(collection(db, 'reports'), reportData);
      console.log('Report saved successfully with ID:', docRef.id);

      // --- 4. Success State Update ---
      setIsSaved(true); // Show success message
      // Clear the form
      setReportName('');
      setEmailId(auth.currentUser ? auth.currentUser.email : ''); // Reset email to logged-in user's or clear
      setReportContent('');
      setUploadedFile(null); // Clear the uploaded file state

      // Hide the success message after a few seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 4000); // Keep message for 4 seconds

    } catch (error) {
      // --- Error Handling ---
      console.error("Error saving report:", error);
      setSaveError(`Failed to save report. ${error.message || 'Please try again.'}`);
      // More specific error handling can be added based on error codes
    } finally {
      // --- Reset Loading State ---
      setIsSaving(false); // Stop loading indicator regardless of success or failure
    }
  };

  // --- Render Component ---
  return (
    <div className="report-section">
      <div className="report-header">
        <h2>Report Section</h2>
        <p>Create Or Upload Report</p>
        {/* Render close button only if onClose prop is provided */}
        {onClose && (
          <button className="close-button" onClick={onClose} disabled={isSaving}>
            <FaTimes />
          </button>
        )}
      </div>

      {/* --- File Upload Section --- */}
      <div className="report-upload">
        <h3>Upload a report (Optional)</h3>
        {/* Dropzone area */}
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${isSaving ? 'disabled' : ''}`}>
          {/* Hidden file input for browsing */}
          <input
            {...getInputProps()}
            id="file-upload-input" // Make sure ID is unique if needed elsewhere
            style={{ display: 'none' }} // Hide the default input
            onChange={handleFileChange} // Use custom handler
            disabled={isSaving}
           />
          <FaCloudUploadAlt className="upload-icon" />
          {/* Display different text based on drag state and uploaded file */}
          {!uploadedFile && <p>{isDragActive ? 'Drop the file here ...' : 'Drag & Drop file or'}</p>}
          {!uploadedFile && <button type="button" className="browse-button" onClick={handleBrowseClick} disabled={isSaving}>Browse</button>}

          {/* Display uploaded file info */}
          {uploadedFile && (
            <div className="uploaded-file-info">
              <FaFile className="file-icon" />
              <p>Selected: {uploadedFile.name}</p>
              {/* Button to clear the selected file */}
              <button
                className="clear-file-button"
                onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} // Prevent dropzone activation
                disabled={isSaving}
                title="Clear selection"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Report Creation Form --- */}
      <div className="report-create">
        <h3>Create a new report</h3>
        {/* Report Title Input */}
        <div className="form-group">
          <label htmlFor="reportName">Report Title</label>
          <input
            type="text"
            id="reportName"
            placeholder="Enter report title"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            disabled={isSaving} // Disable input while saving
          />
        </div>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="emailId">Your Email</label>
          <input
            type="email"
            id="emailId"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            disabled={isSaving} // Disable input while saving
            required // Make email required for submission logic
          />
        </div>
        {/* Report Content Textarea */}
        <div className="form-group">
          <label htmlFor="reportContent">Report Content</label>
          <textarea
            id="reportContent"
            placeholder="Write your report here..."
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            disabled={isSaving} // Disable textarea while saving
            rows={5} // Set a default size
          ></textarea>
        </div>

        {/* --- Error and Success Messages --- */}
        {saveError && <p className="error-message">{saveError}</p>}
        {isSaved && <p className="success-message"><FaCheckCircle /> Report saved successfully!</p>}


        {/* Save Button */}
        <button
          className="save-report-button"
          onClick={handleSaveReport}
          disabled={isSaving || isSaved} // Disable if currently saving or just saved
        >
          {isSaving ? (
            <>
              <FaSpinner className="spinner-icon" /> Saving...
            </>
          ) : (
             'Save Report'
          )}
        </button>
      </div>
    </div>
  );
}

export default ReportSection;



// **Key Changes and How it Works:**

// 1.  **Firebase Imports:** Necessary functions from `firebase/firestore`, `firebase/storage`, and `firebase/auth` are imported.
// 2.  **Firebase Initialization:** Instances of Firestore (`db`), Storage (`storage`), and Auth (`auth`) are created.
// 3.  **User Tracking (`useEffect`, `onAuthStateChanged`):**
//     * The code now listens for changes in the user's login status.
//     * If a user is logged in, their `userId` is stored in the state. This is useful for organizing reports in Storage and Firestore (e.g., storing reports under a user-specific folder).
//     * It also attempts to pre-fill the email field if the logged-in user has an email associated with their account.
// 4.  **State Variables:**
//     * `isSaving`: Tracks whether the save operation is in progress (to show loading indicators and disable inputs).
//     * `saveError`: Stores any error message that occurs during the process.
//     * `userId`: Stores the logged-in user's ID (or `null`).
// 5.  **`handleSaveReport` (Async Function):**
//     * **Validation:** Basic checks are performed to ensure some data is entered or a file is selected, and that email is present.
//     * **Set Loading:** `isSaving` is set to `true`.
//     * **File Upload (Conditional):**
//         * If `uploadedFile` exists, it creates a reference in Firebase Storage (using a path like `reports/userId/timestamp_filename`).
//         * `uploadBytes` uploads the file.
//         * `getDownloadURL` retrieves the public URL of the uploaded file. This URL is stored in `fileURL`.
//     * **Prepare Firestore Data:** An object (`reportData`) is created containing the report title, email, content, the `fileURL` (which will be `null` if no file was uploaded), a server-generated timestamp (`serverTimestamp()`), and the `userId`.
//     * **Save to Firestore:** `addDoc(collection(db, 'reports'), reportData)` saves this object as a new document in a Firestore collection named "reports". You'll see this collection appear in your Firebase console.
//     * **Success:** If everything works, `isSaved` is set to `true`, the form fields and `uploadedFile` state are cleared, and a success message appears briefly.
//     * **Error Handling:** A `try...catch` block catches errors during upload or Firestore write. The error message is stored in `saveError` and displayed to the user.
//     * **Finally:** `isSaving` is set back to `false` regardless of success or failure.
// 6.  **UI Updates:**
//     * Inputs and buttons are `disabled` when `isSaving` is true.