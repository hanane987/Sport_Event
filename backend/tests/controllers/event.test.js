import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js'; 
import Evenement from '../models/Evenement.js';
import User from '../models/User.js';

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

describe('Event API Tests', () => {
  let participant1, participant2;

  beforeEach(async () => {
    await Evenement.deleteMany({});
    await User.deleteMany({});

    participant1 = await User.create({
      name: 'Participant One',
      email: 'participant1@example.com',
      role: 'Participant',
    });

    participant2 = await User.create({
      name: 'Participant Two',
      email: 'participant2@example.com',
      role: 'Participant',
    });
  });
  afterEach(async () => {
    await Evenement.deleteMany({});
    await User.deleteMany({});
  });

  it('should create a new event', async () => {
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event.',
      date: '2024-12-20T09:00:00Z',
      location: 'Test Location',
      image: 'test-image.jpg',
      participants: [participant1._id, participant2._id],
    };

    const response = await request(app).post('/api/events').send(eventData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(eventData.title);
    expect(response.body.participants.length).toBe(2);
  });
  it('should not create an event with invalid participants', async () => {
    const eventData = {
      title: 'Invalid Event',
      description: 'Invalid participants.',
      date: '2024-12-20T09:00:00Z',
      location: 'Test Location',
      image: 'test-image.jpg',
      participants: [mongoose.Types.ObjectId()], 
    };

    const response = await request(app).post('/api/events').send(eventData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Some participants are invalid or do not have the correct role'
    );
  });

  it('should retrieve all events', async () => {
    await Evenement.create({
      title: 'Event One',
      description: 'First Event',
      date: '2024-12-20T09:00:00Z',
      location: 'Location One',
      image: 'image1.jpg',
      participants: [participant1._id],
    });

    await Evenement.create({
      title: 'Event Two',
      description: 'Second Event',
      date: '2024-12-21T10:00:00Z',
      location: 'Location Two',
      image: 'image2.jpg',
      participants: [participant2._id],
    });

    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should retrieve an event by ID', async () => {
    const event = await Evenement.create({
      title: 'Specific Event',
      description: 'Details about this event.',
        date: '2024-12-20T09:00:00Z',
      location: 'Specific Location',
      image: 'specific-image.jpg',
      participants: [participant1._id],
    });

    const response = await request(app).get(`/api/events/${event._id}`);

   
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(event.title);
  });

  it('should update an event', async () => {
    const event = await Evenement.create({
      title: 'Event to Update',
      description: 'Old description',
      date: '2024-12-20T09:00:00Z',
      location: 'Old Location',
      image: 'old-image.jpg',
      participants: [participant1._id],
    });

    const updateData = {
      title: 'Updated Event',
      description: 'New description',
      location: 'New Location',
      participants: [participant1._id, participant2._id],
    };

    const response = await request(app)
      .put(`/api/events/${event._id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.event.title).toBe(updateData.title);
    expect(response.body.event.participants.length).toBe(2);
  });
  it('should delete an event', async () => {
    const event = await Evenement.create({
      title: 'Event to Delete',
      description: 'Details about this event.',
      date: '2024-12-20T09:00:00Z',
      location: 'Some Location',
      image: 'some-image.jpg',
      participants: [participant1._id],
    });

    const response = await request(app).delete(`/api/events/${event._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted successfully');
  });
});