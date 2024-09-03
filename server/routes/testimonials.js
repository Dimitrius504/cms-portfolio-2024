import express from "express";
import Testimonial from '../models/TestimonialSchema.js';
import Admin from '../models/AdminSchema.js';

const router = express.Router();

// Route for getting a users testimonial
router.get('/user-testimonial', async (req, res) => {
    const { userId } = req.query;

    try {
        const testimonials = await Testimonial.find({ userId: userId });
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route for getting all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate('userId');
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route for creating a new testimonial
router.post('/', async (req, res) => {
    const { userId, name, companyName, text, relationship } = req.body;

    try {
        const newTestimonial = new Testimonial({
            userId,
            name,
            companyName,
            relationship,
            text,
        });

        const savedTestimonial = await newTestimonial.save();

        res.status(201).json(savedTestimonial);
    } catch (error) {
        console.error('Error saving testimonial:', error);
        res.status(400).json({ error: 'Error saving testimonial. Ensure all required fields are provided.' });
    }
});

// Route for deleting a testimonial
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { text, relationship, name, companyName } = req.body;

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            id,
            { text, relationship, name, companyName, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(400).json({ error: 'Error updating testimonial. Ensure all required fields are provided.' });
    }
});


export default router;
