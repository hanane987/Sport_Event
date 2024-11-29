import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Participant',
    name: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      });

      localStorage.setItem('token', response.data.token);
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>Join us to start your journey</p>
      </header>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <button 
        type="button" 
        className={styles.googleButton}
        onClick={() => window.location.href = '/auth/google/register'}
        aria-label="Continue with Google"
      >
        <img src="/images/google-icon.svg" alt="" className={styles.googleIcon} />
        Continue with Google
      </button>

      <div className={styles.divider} role="separator">
        <span>or Register with Email</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            required
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

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
            minLength={8}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="role" className={styles.label}>
            Account Type
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={styles.select}
            required
            aria-required="true"
          >
            <option value="Participant">Participant</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className={styles.login}>
        Already have an account?{' '}
        <a href="/login" className={styles.loginLink}>
          Sign in here
        </a>
      </p>
    </div>
  );
}

export default RegisterForm;