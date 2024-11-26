import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/evenementController.js';

const router = express.Router();

// Public route for events (no authentication required)
router.get('/', getAllEvents); 
router.get('/:id', getEventById); 

// Protected routes for events (authentication required)
router.post('/', authenticateToken, createEvent);  
router.put('/:id', authenticateToken, updateEvent); 
router.delete('/:id', authenticateToken, deleteEvent); 

export default router;
