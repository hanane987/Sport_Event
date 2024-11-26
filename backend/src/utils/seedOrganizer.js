import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedOrganizer = async () => {
  try {
    // Check if an organizer already exists
    const existingOrganizer = await User.findOne({ email: 'organizer@example.com' });
    if (existingOrganizer) {
      console.log('Organizer already exists');
      return mongoose.connection.close();
    }

    // Create an organizer
    const organizer = new User({
      email: 'organizer@example.com',
      password: 'organizerpassword', // Raw password; hashed in the model
      role: 'Organizer',
    });

    await organizer.save();
    console.log('Organizer seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run seed script
(async () => {
  await connectDB();
  await seedOrganizer();
})();
