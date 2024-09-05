import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  rating: {
    type: Number,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  parentSkillCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Skill', skillSchema);
