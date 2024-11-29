import React from 'react';
import styles from '../styles/EventCard.module.css';  // Adjust the path based on where your EventCard.js is located

const EventCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <img 
        src={event.image} 
        alt={event.title} 
        className={styles.eventImage} 
      />
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.location}>{event.location}</p>
      <p className={styles.date}>{new Date(event.date).toLocaleDateString()}</p>
    </div>
  );
};

export default EventCard;
