import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  currentStatus: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  employedSince: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

const Status = mongoose.model('Status', statusSchema);

export default Status;
