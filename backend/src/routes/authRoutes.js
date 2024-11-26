import express from 'express';
import { login, registerParticipant,loginparticipant } from '../controllers/authController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', registerParticipant);
router.post('/loginn',loginparticipant);
// Protected route for Organizers
router.get(
  '/organizer-dashboard',
  authenticateToken,
  authorizeRoles('Organizer'),
  (req, res) => {
    res.status(200).json({ message: 'Welcome to the Organizer dashboard!' });
  }
);

export default router;
