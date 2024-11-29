import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js'; // Replace with the path to your app
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Authentication API Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('Register Participant', () => {
    it('should register a participant successfully', async () => {
      const participantData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/auth/register') // Adjust endpoint if different
        .send(participantData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Participant registered successfully');
      expect(response.body.user.email).toBe(participantData.email);

      const user = await User.findOne({ email: participantData.email });
      expect(user).not.toBeNull();
      expect(user.role).toBe('Participant');
    });

    it('should return an error for duplicate email', async () => {
      const participantData = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'password123',
      };

      await User.create(participantData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(participantData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already in use');
    });
  });
  
