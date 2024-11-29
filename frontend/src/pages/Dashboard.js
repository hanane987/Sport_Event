import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); // Correct endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Event Dashboard</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.eventGrid}>
          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => <EventCard key={event._id} event={event} />)
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
