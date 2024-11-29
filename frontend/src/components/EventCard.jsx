import React from 'react';
import styles from '../styles/EventCard.module.css';  // Adjust the path based on where your EventCard.js is located
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <img 
        src={event.image} 
        alt={`Event: ${event.title}`} // Improved alt text
        className={styles.eventImage} 
      />
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.location}>{event.location}</p>
      <p className={styles.date}>{new Date(event.date).toLocaleDateString()}</p>
      <Link to={`/event/${event._id}`}>Learn More</Link>
    </div>
  );
};

export default EventCard;
