import asyncHandler from 'express-async-handler';
import Vessel from '../models/vesselModel.js';

// @Desc    Fetch all Vessels
// @Route   GET /api/vessels
// @access  Private
const getVessels = asyncHandler(async (req, res) => {
  const vessels = await Vessel.find({});
  res.json(vessels);
});

export { getVessels };
