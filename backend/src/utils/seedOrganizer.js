import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Organizer from '../models/Organizer.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit with failure
  }
};

const seedOrganizer = async () => {
  try {
    // Clear existing organizers (optional)
    await Organizer.deleteMany();

    // Create a new organizer
    const organizer = new Organizer({
      email: 'organizer@example.com',
      password: 'organizerpassword', // Will be hashed before saving
    });

    await organizer.save();
    console.log('Organizer seeded successfully');
  } catch (err) {
    console.error('Error seeding organizer:', err);
  } finally {
    mongoose.connection.close(); // Ensure the connection closes
  }
};

// Run the functions
(async () => {
  await connectDB();
  await seedOrganizer();
})();
