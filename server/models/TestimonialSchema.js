import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    relationship: {
        type: String,
        required: true,
        enum: ["Client", "Employee", "Employer", "Professor", "Family Member", "Friend", "Work Colleague", "Other"]
    },
    name: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

testimonialSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
