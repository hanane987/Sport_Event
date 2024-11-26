import Evenement from '../models/Evenement.js';

// Create a new event
export const createEvent = async (req, res) => {
    const { title, description, date, location, image, participants } = req.body;
  
    try {
      // Validate required fields
      if (!title || !date || !location || !image) {
        return res.status(400).json({
          message: 'Validation error',
          error: 'Title, date, location, and image are required fields.',
        });
      }
  
      // Convert participant IDs to ObjectId
      const participantIds = participants.map((id) => mongoose.Types.ObjectId(id));
  
      const newEvent = new Evenement({
        title,
        description,
        date,
        location,
        image,
        participants: participantIds,
      });
  
      const savedEvent = await newEvent.save();
      res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (error) {
      res.status(400).json({
        message: 'Error creating event',
        error: error.message,
      });
    }
  };
// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Evenement.find().populate('participants', 'name email'); // Populate participant details
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Evenement.findById(id).populate('participants', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving event', error: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, image, participants } = req.body;

  try {
    const updatedEvent = await Evenement.findByIdAndUpdate(
      id,
      { title, description, date, location, image, participants },
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

