import express from "express";
import Category from "../models/CategorySchema.js";
import mongoose from "mongoose";

const router = express.Router();

// Route for getting all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}).populate('skills', 'name rating icon');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for fetching recent categories
router.get('/recent', async (req, res) => {
  try {
    const recentCategories = await Category.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(recentCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent categories' });
  }
});


// Route for creating a new category
router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    skills: req.body.skills,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for getting a single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Skill not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating a category
router.patch("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedFields = {};

    if (req.body.name) updatedFields.name = req.body.name;
    if (req.body.skills) updatedFields.skills = req.body.skills;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(400).json({ message: error.message });
  }
});

// Route for deleting a category
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
