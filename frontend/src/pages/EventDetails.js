import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/details.module.css';

const EventDetails = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the event data by ID from your backend API
    fetch(`/api/events/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Event not found');
        }
        return response.json();  // Parse the response as JSON
      })
      .then(data => {
        setEvent(data);  // Store event data in the state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
        setLoading(false);  // Set loading to false if an error occurs
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;  // Loading state while the data is being fetched
  }

  if (!event) {
    return <div>Event not found</div>;  // Display if the event is not found
  }

  return (
    <div className="eventDetailsContainer">
  <h3 className="eventTitle">{event.title}</h3>
  <p className="eventDescription">{event.description}</p>
  <p className="eventDate">{event.date}</p>
  <div className="participantsContainer">
    <h4 className="participantsTitle">Participants:</h4>
    {event.participants && event.participants.length > 0 ? (
      event.participants.map((participant) => (
        <div key={participant._id} className="participant">
          <p className="participantName">{participant.name}</p>
          <span className="participantEmail">({participant.email})</span>
        </div>
      ))
    ) : (
      <p>No participants yet</p>
    )}
  </div>
</div>

  );
};

export default EventDetails;
