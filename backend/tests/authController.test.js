import request from 'supertest';
import app from '../app'; // Assuming you have an app.js file to export the express app
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock bcrypt and jwt
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/User.js');

describe('AuthController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        _id: '12345',
        email: 'testuser@example.com',
        password: 'hashedpassword', // The password is already hashed
        role: 'Organizer',
      };

      const reqBody = {
        email: 'testuser@example.com',
        password: 'password', // The plaintext password
      };

      // Mock User.findOne() to return the mock user
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); // Simulate password match
      jwt.sign.mockReturnValue('mocked-token'); // Mock the token generation

      const res = await request(app).post('/api/auth/login').send(reqBody);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.token).toBe('mocked-token');
      expect(res.body.user.email).toBe(mockUser.email);
      expect(res.body.user.role).toBe(mockUser.role);
    });

    it('should return an error if user not found', async () => {
      const reqBody = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      User.findOne.mockResolvedValue(null); // Simulate user not found

      const res = await request(app).post('/api/auth/login').send(reqBody);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('User not found');
    });

    it('should return an error if password is incorrect', async () => {
      const mockUser = {
        _id: '12345',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        role: 'Organizer',
      };

      const reqBody = {
        email: 'testuser@example.com',
        password: 'wrongpassword', // Incorrect password
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); // Simulate password mismatch

      const res = await request(app).post('/api/auth/login').send(reqBody);

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new participant', async () => {
      const reqBody = {
        email: 'newparticipant@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      // Mock User.findOne() to return null (email is available)
      User.findOne.mockResolvedValue(null);
      const mockSave = jest.fn().mockResolvedValue(true);
      User.prototype.save = mockSave;

      const res = await request(app).post('/api/auth/register').send(reqBody);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Participant registered successfully');
      expect(mockSave).toHaveBeenCalled(); // Ensure save was called
    });

    it('should return an error if email already exists', async () => {
      const reqBody = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Jane Doe',
      };

      // Mock User.findOne() to return an existing user (email is taken)
      User.findOne.mockResolvedValue({ _id: '123', email: 'existing@example.com' });

      const res = await request(app).post('/api/auth/register').send(reqBody);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email already in use');
    });
  });

  describe('POST /api/auth/loginparticipant', () => {
    it('should login participant successfully with valid credentials', async () => {
      const mockUser = {
        _id: '12345',
        email: 'participant@example.com',
        password: 'hashedpassword',
        role: 'Participant',
      };

      const reqBody = {
        email: 'participant@example.com',
        password: 'password', // The plaintext password
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); // Simulate password match
      jwt.sign.mockReturnValue('mocked-token'); // Mock the token generation

      const res = await request(app).post('/api/auth/loginparticipant').send(reqBody);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('login success');
      expect(res.body.token).toBe('mocked-token');
      expect(res.body.user.role).toBe(mockUser.role);
    });

    it('should return an error if participant not found', async () => {
      const reqBody = {
        email: 'nonparticipant@example.com',
        password: 'password',
      };

      User.findOne.mockResolvedValue(null); // Simulate participant not found

      const res = await request(app).post('/api/auth/loginparticipant').send(reqBody);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('not foun');
    });

    it('should return an error if password is incorrect for participant', async () => {
      const mockUser = {
        _id: '12345',
        email: 'participant@example.com',
        password: 'hashedpassword',
        role: 'Participant',
      };

      const reqBody = {
        email: 'participant@example.com',
        password: 'wrongpassword', // Incorrect password
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); // Simulate password mismatch

      const res = await request(app).post('/api/auth/loginparticipant').send(reqBody);

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('invalid credantial');
    });
  });
});
