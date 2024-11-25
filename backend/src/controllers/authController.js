import Organizer from '../models/Organizer.js';
import bcrypt from 'bcryptjs';

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if organizer exists
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful
    return res.status(200).json({ message: 'Login successful', organizerId: organizer._id });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
