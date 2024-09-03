import express from 'express';
import Status from '../models/StatusSchema.js';

const router = express.Router();

// Route for fetching status
router.get('/', async (req, res) => {
  try {
    const status = await Status.findOne();
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Route for updating status
router.put('/', async (req, res) => {
  const { currentStatus, details, employedSince } = req.body;

  try {
    let status = await Status.findOne();

    if (status) {
      status.currentStatus = currentStatus;
      status.details = details;
      status.employedSince = employedSince;
      await status.save();
      res.json(status);
    } else {
      const newStatus = new Status({
        currentStatus,
        details,
        employedSince,
      });
      await newStatus.save();
      res.status(201).json(newStatus);
    }
  } catch (error) {
    console.error('Error saving status:', error);
    res.status(400).json({ error: 'Error saving status. Ensure all required fields are provided.' });
  }
});


export default router;
