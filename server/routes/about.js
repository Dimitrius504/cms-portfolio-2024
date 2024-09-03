import express from 'express';
import dotenv from 'dotenv';
import Education from '../models/EducationSchema.js';
import Experience from '../models/ExperienceSchema.js';
import Bio from '../models/BioSchema.js';
import Hobbies from '../models/HobbySchema.js';
import multer from 'multer';

dotenv.config();

const router = express.Router();

// Get Bio
router.get('/bio', async (req, res) => {
    try {
        const updatedBio = await Bio.findOneAndUpdate(
            {},
            { summary: req.body.summary, updatedAt: Date.now() },
            { new: true, upsert: true }
        );
        res.json(updatedBio);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.put('/bio', async (req, res) => {
    try {
        const updatedBio = await Bio.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedBio);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Get All Experiences
router.get('/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Create a New Experience
router.post('/experiences', async (req, res) => {
    try {
        const newExperience = new Experience(req.body);
        const savedExperience = await newExperience.save();
        res.json(savedExperience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
// Get a single experience entry by ID
router.get('/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience entry not found' });
        }
        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Update an experience entry
router.put('/experiences/:id', async (req, res) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExperience);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Delete an experience entry
router.delete('/experiences/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience entry deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get All Education Entries
router.get('/education', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Post a new education entry
router.post('/education', async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        const savedEducation = await newEducation.save();
        res.json(savedEducation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get a single education entry by ID
router.get('/education/:id', async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: 'Education entry not found' });
        }
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Update an education entry
router.put('/education/:id', async (req, res) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEducation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Delete an education entry
router.delete('/education/:id', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education entry deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get All Hobbies
router.get('/hobbies', async (req, res) => {
    try {
        const hobbies = await Hobbies.find();
        res.json(hobbies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get a single hobby by ID
router.get('/hobbies/:id', async (req, res) => {
    try {
        const hobby = await Hobbies.findById(req.params.id);
        if (!hobby) {
            return res.status(404).json({ message: 'Hobby not found' });
        }
        res.json(hobby);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Create a new hobby
router.post('/hobbies', upload.single('image'), async (req, res) => {
    try {
        const hobby = new Hobbies({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
        });

        const savedHobby = await hobby.save();
        res.json(savedHobby);
    } catch (error) {
        res.status(500).json({ message: 'Error saving hobby', error });
    }
});

// Update a Hobby with file upload
router.put('/hobbies/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            description: req.body.description,
        };

        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedHobby = await Hobbies.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedHobby);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Delete a Hobby
router.delete('/hobbies/:id', async (req, res) => {
    try {
        await Hobbies.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hobby deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

export default router;
