import express from 'express';
const router = express.Router();

import {
  getTickets,
  getTicketById,
  createTicketReply,
  createTicket,
} from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getTickets);
router.route('/').post(protect, createTicket);
router.route('/:id').get(protect, getTicketById);
router.route('/:id/replies').post(protect, createTicketReply);

export default router;
