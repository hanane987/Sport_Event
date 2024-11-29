import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/SignUpForm.module.css'; // Assuming your CSS styles are similar to this.

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      localStorage.setItem('token', data.token);
      const { role } = data.user;
      
      if (role === 'Organizer') {
        window.location.href = '/admin';
      } else if (role === 'Participant') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h2 className={styles.title}>Login to your Account</h2>
        <p className={styles.subtitle}>See what is going on with your business</p>
      </header>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <button
        type="button"
        className={styles.googleButton}
        onClick={() => window.location.href = '/auth/google'}
        aria-label="Continue with Google"
      >
        <img src="/images/google-icon.svg" alt="" className={styles.googleIcon} />
        Continue with Google
      </button>

      <div className={styles.divider} role="separator">
        <span>or Sign in with Email</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            required
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.input}
            required
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            <span>Remember Me</span>
          </label>

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className={styles.register}>
        Not Registered Yet?{' '}
        <a href="/register" className={styles.registerLink}>
          Create an account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
