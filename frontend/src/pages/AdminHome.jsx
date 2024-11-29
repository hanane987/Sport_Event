import React, { useEffect, useState } from 'react';
import styles from '../styles/adminHome.module.css';
import axios from 'axios';

const navigationLinks = [
  { text: 'Dashboard', isActive: true },
  { text: 'Expenses', isActive: false },
  { text: 'Wallets', isActive: false },
  { text: 'Summary', isActive: false },
  { text: 'Accounts', isActive: false },
  { text: 'Settings', isActive: false },
];

const DashboardLayout = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Adjust the API route as per your setup
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Delete an event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <main className={styles.dashboard} role="main">
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar} role="complementary">
          <div className={styles.userProfile}>
            <h2 className={styles.userName}>Samantha</h2>
            <p className={styles.userEmail}>samantha@email.com</p>
          </div>
          <nav className={styles.navigation} aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <button
                key={link.text}
                className={`${styles.sidebarLink} ${link.isActive ? styles.active : ''}`}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.text}
              </button>
            ))}
          </nav>
        </aside>
        <section className={styles.mainContent} aria-label="Dashboard content">
          <div className={styles.contentBackground}>
          
              <h2>Manage Events</h2>
              {loading ? (
                <p>Loading events...</p>
              ) : (
                <table className={styles.eventTable}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}>
                        <td>{event.title}</td>
                        <td>{event.description}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.location}</td>
                        <td>
                          <button
                            className={styles.editButton}
                            onClick={() => alert(`Edit Event ${event.title}`)} // Replace with actual edit functionality
                          >
                            Edit
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
      
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
