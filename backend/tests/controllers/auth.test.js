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
  describe('Login', () => {
    it('should login a user successfully', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
        role: 'Participant',
      });

      const response = await request(app)
        .post('/api/auth/login') // Adjust endpoint if different
        .send({ email: user.email, password });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.token).not.toBeNull();
    });

    it('should return an error for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'unknown@example.com', password: 'password123' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    it('should return an error for incorrect password', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: hashedPassword,
        role: 'Participant',
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'janedoe@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('Login Participant', () => {
    it('should login a participant successfully', async () => {
      const password = 'participant123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: 'Participant One',
        email: 'participant@example.com',
        password: hashedPassword,
        role: 'Participant',
      });

      const response = await request(app)
        .post('/api/auth/login-participant') // Adjust endpoint if different
        .send({ email: user.email, password });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('login success');
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.token).not.toBeNull();
    });

    it('should return an error for non-existent participant', async () => {
      const response = await request(app)
        .post('/api/auth/login-participant')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('not foun');
    });

    it('should return an error for incorrect participant password', async () => {
      const password = 'participant123';
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: 'Participant Two',
        email: 'participant2@example.com',
        password: hashedPassword,
        role: 'Participant',
      });

      const response = await request(app)
        .post('/api/auth/login-participant')
        .send({ email: 'participant2@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('invalid credantial');
    });
  });
});
