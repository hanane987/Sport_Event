import React, { useState, useEffect } from 'react';
import styles from '../styles/adminHome.module.css';

const DashboardLayout = () => {
  const [events, setEvents] = useState([]); // Ensure events is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
        const response = await fetch('/api/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched events:', data);  // Log the response to check the structure
          if (Array.isArray(data)) {
            setEvents(data);
          } else {
            console.error('Response is not an array:', data);
          }
        } else {
          console.error('Error fetching events:', response.statusText);
        }
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
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        console.log('Created event:', newEvent);  // Log the new event for verification
        // Check if the newEvent is valid and if it's an array to prevent undefined length error
        if (newEvent && Array.isArray(events)) {
          setEvents([...events, newEvent]);
        } else {
          console.error('New event data is invalid:', newEvent);
        }
        setFormData({ title: '', description: '', date: '', location: '' });
        setShowForm(false);
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Delete an event
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        console.error('Error deleting event:', response.statusText);
      }
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
            <button className={`${styles.sidebarLink} ${styles.active}`}>
              Dashboard
            </button>
            {/* Other links */}
          </nav>
        </aside>
        <section className={styles.mainContent} aria-label="Dashboard content">
          <div className={styles.contentBackground}>
            <div className={styles.header}>
              <h2>Manage Events</h2>
              <button
                className={styles.addButton}
                onClick={() => setShowForm(!showForm)}
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
                  {events.length > 0 ? (
                    events.map((event) => (
                      <tr key={event._id}>
                        <td>{event.title}</td>
                        <td>{event.description}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.location}</td>
                        <td>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No events available.</td>
                    </tr>
                  )}
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
