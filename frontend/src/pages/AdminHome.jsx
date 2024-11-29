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
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/events', formData);
      setEvents([...events, response.data]); // Add new event to the table
      setFormData({ title: '', description: '', date: '', location: '' }); // Clear the form
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

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
            <div className={styles.header}>
              <h2>Manage Events</h2>
              <button
                className={styles.addButton}
                onClick={() => setShowForm(!showForm)} // Toggle form visibility
              >
                {showForm ? 'Cancel' : 'Add Event'}
              </button>
            </div>
            {showForm && (
              <form className={styles.eventForm} onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Event Title"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Event Description"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event Location"
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  Create Event
                </button>
              </form>
            )}
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
