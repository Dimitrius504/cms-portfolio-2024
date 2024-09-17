import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  isKeyProject: {
    type: Boolean,
    default: false,
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
});

export default mongoose.model('Project', ProjectSchema);
