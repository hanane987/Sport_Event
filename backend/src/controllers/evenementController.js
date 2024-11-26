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
