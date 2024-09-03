import express from "express";
const router = express.Router();

// Get all items
router.get('/items', async (req, res) => {
  res.json('cum');
});

// Create a new item
router.post('/items', async (req, res) => {
 console.log('you came');
});

export default router;
