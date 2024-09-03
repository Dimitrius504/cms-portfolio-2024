import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    degreeTitle: {
        type: String,
        required: true
    },
    institutionName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Education = mongoose.model("Education", educationSchema);

export default Education;
