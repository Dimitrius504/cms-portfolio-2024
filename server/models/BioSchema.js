import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Bio = mongoose.model("Bio", bioSchema);

export default Bio;
