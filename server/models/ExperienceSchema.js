import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
