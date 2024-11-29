import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Corrected import path
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/evenementController.js'; // Corrected import path

const router = express.Router();

// Public routes for events (no authentication required)
router.get('/', getAllEvents); 
router.get('/:id', getEventById); 

// Protected routes for events (authentication required)
router.post('/', authenticateToken, createEvent);  
router.put('/:id', authenticateToken, updateEvent); 
router.delete('/:id', authenticateToken, deleteEvent); 

export default router;
