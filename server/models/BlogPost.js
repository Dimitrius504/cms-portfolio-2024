import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: [String],
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('BlogPost', blogPostSchema);
