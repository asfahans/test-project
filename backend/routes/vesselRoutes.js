import express from 'express';
const router = express.Router();
import { getVessels } from '../controllers/vesselController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getVessels);

export default router;
