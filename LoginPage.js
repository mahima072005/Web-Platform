

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation
import { getAuth ,signInWithEmailAndPassword ,sendPasswordResetEmail } from 'firebase/auth';
import app from './firebaseConfig'; // Import your Firebase configuration
import { FaUserCircle, FaEnvelope, FaLock, FaEye, FaEyeSlash ,FaTimes} from 'react-icons/fa'; // Import icons
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Loading state for login
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setResetEmailSent(false); // Clear reset message on new login attempt
    setIsLoggingIn(true); // Start loading

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Login successful:', userCredential.user);
        setIsLoggingIn(false);
        navigate('/rooms'); // Or your desired route after login
      })
      .catch((error) => {
        console.error('Login Error:', error);
        let errorMessage = 'Login failed. Please check your credentials.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'This user account has been disabled.';
        }
        setLoginError(errorMessage);
        setIsLoggingIn(false); // Stop loading
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      setLoginError('Please enter your email address first to reset the password.');
      return;
    }

    setLoginError('');
    setResetEmailSent(false);
    setIsResettingPassword(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetEmailSent(true);
        setLoginError(''); // Clear any previous errors
        console.log('Password reset email sent!');
      })
      .catch((error) => {
        let errorMessage = 'Error sending reset email. Please try again.';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email address.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address format.';
        }
        setLoginError(errorMessage);
        console.error('Error sending password reset email:', error);
      })
      .finally(() => {
        setIsResettingPassword(false);
      });
  };


   // Handle close button click
   const handleClose = () => {
    navigate(-1); // Go back to previous page
  };
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Optional: Close button if it's meant to be modal-like */}
        <button className="close-button" onClick={handleClose}>
          <FaTimes/>
        </button>

        <div className="login-header">
          <FaUserCircle className="user-icon" />
          <h2>Welcome Back!</h2>
          <p>Login to continue to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {/* Display Login or Reset Errors */}
          {loginError && <p className="error-message">{loginError}</p>}

          {/* Display Reset Success Message */}
          {resetEmailSent && (
            <p className="success-message">
              Password reset email sent to {email}! Please check your inbox (and spam folder).
            </p>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address" // Use placeholder
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoggingIn || isResettingPassword} // Disable during loading
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'} // Toggle type
              id="password"
              name="password"
              placeholder="Password" // Use placeholder
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoggingIn || isResettingPassword} // Disable during loading
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="options-group">
            <label className="remember-me">
              <input type="checkbox" name="remember" disabled={isLoggingIn || isResettingPassword}/> Remember me
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={handleForgotPassword}
              disabled={isResettingPassword || isLoggingIn} // Disable during loading
            >
              {isResettingPassword ? 'Sending...' : 'Forgot password?'}
            </button>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoggingIn || isResettingPassword} // Disable during loading
            >
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
