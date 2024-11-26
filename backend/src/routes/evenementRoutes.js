import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/evenementController.js';

