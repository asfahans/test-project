import mongoose from 'mongoose';

const vesselSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Vessel = mongoose.model('Vessel', vesselSchema);

export default Vessel;
