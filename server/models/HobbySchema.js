import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
});

const Hobbies = mongoose.model("Hobbies", hobbySchema);

export default Hobbies;
