import express from 'express';
const router = express.Router();

import {
  getTickets,
  getTicketById,
  createTicketReply,
  createTicket,
  deleteTicket,
  updateTicketToClosed,
  updateReplyToApproved,
  getMyTickets,
  getAllTickets,
  deleteReply,
} from '../controllers/ticketController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getTickets);
router.route('/').post(protect, createTicket);
router.route('/my').get(protect, getMyTickets);
router.route('/all').get(protect, admin, getAllTickets);
router.route('/:id').get(protect, getTicketById);
router.route('/:id').delete(protect, admin, deleteTicket);
router.route('/:id/replies').post(protect, createTicketReply);
router.route('/:id/close').put(protect, updateTicketToClosed);
router.route('/:id/reply/:replyId').delete(protect, deleteReply);
router
  .route('/:id/reply/:replyId/approved')
  .put(protect, updateReplyToApproved);

export default router;
