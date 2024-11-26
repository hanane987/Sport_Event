import Evenement from '../models/Evenement.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, image, participants } = req.body;

    // Ensure the participants are valid ObjectIds and have the role 'Participant'
    const participantIds = await User.find({
      _id: { $in: participants }, // Ensure participants are valid ObjectIds
      role: 'Participant', // Ensure the role is 'Participant'
    }).select('_id'); // Only select the ObjectId field

    console.log('Valid participants:', participantIds);

    if (participantIds.length !== participants.length) {
      return res.status(400).json({ message: 'Some participants are invalid or do not have the correct role' });
    }

    // Create the event with validated participants
    const newEvent = new Evenement({
      title,
      description,
      date,
      location,
      image,
      participants: participantIds.map(participant => participant._id), // Add participant ObjectIds
    });

    // Save the event
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Evenement.find()
      .populate('participants', 'name email'); // Populate participant details
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
};



// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    // Find the event by its ID and populate the 'participants' field with 'name' and 'email'
    const event = await Evenement.findById(req.params.id)
      .populate('participants', 'name email') // Populate participants with name and email
      .exec();

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving event', error: error.message });
  }
};



// Update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image, participants } = req.body;

  try {
    const participantIds = await User.find({
      _id: { $in: participants },
      role: 'Participant',
    }).select('_id');

    if (participantIds.length !== participants.length) {
      return res.status(400).json({ message: 'Some participants are invalid or do not have the correct role' });
    }

    const updatedEvent = await Evenement.findByIdAndUpdate(
      id,
      { title, description, date, location, image, participants: participantIds.map(participant => participant._id) },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Evenement.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};
