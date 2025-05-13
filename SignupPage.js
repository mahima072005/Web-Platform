

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './firebaseConfig'; // Ensure this path is correct
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import both eye icons
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');

    if (!username) {
      setSignupError('Please enter a username.');
      return;
    }
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setSignupError('Password should be at least 6 characters long.');
      return;
    }

    setIsSigningUp(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signup successful:', userCredential.user);
        // Optionally, store username in Firestore/Realtime Database
        // For example:
        // const db = getDatabase(app); // if using Realtime Database
        // set(ref(db, 'users/' + userCredential.user.uid), {
        //   username: username,
        //   email: email
        // });
        setIsSigningUp(false);
        navigate('/login'); // Navigate to login after successful signup
      })
      .catch((error) => {
        console.error('Signup Error:', error);
        let errorMessage = 'Signup failed. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email address is already registered.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address format.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        }
        setSignupError(errorMessage);
        setIsSigningUp(false);
      });
  };

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <button className="close-button" onClick={handleClose} aria-label="Close signup">×</button>
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Fill in the details below to sign up.</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          {signupError && <p className="error-message">{signupError}</p>}

          {/* Username Input */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isSigningUp}
              aria-label="Username"
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSigningUp}
              aria-label="Email address"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSigningUp}
              aria-label="Password"
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {/* Conditionally render FaEye or FaEyeSlash */}
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isSigningUp}
              aria-label="Confirm Password"
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Hide password" : "Show password"}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {/* Conditionally render FaEye or FaEyeSlash */}
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={isSigningUp}
          >
            {isSigningUp ? 'Signing Up...' : 'Signup'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
