import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

 
router.post('/', authMiddleware, roleMiddleware([ 'Organizer']), createEvent);
router.put('/:id', authMiddleware, roleMiddleware([ 'Organizer']), updateEvent);
router.delete('/:id', authMiddleware, roleMiddleware(['Organizer']), deleteEvent);

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

export default router;
