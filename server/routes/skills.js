import express from "express";
import Skill from "../models/SkillSchema.js";
import Category from "../models/CategorySchema.js";
import Project from "../models/ProjectSchema.js";
import { body, validationResult } from 'express-validator';
import mongoose from "mongoose";

const router = express.Router();

// Route for getting all skills
router.get("/", async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = {};

    if (categoryId) {
      filter.parentSkillCategory = categoryId;
    }

    const skills = await Skill.find(filter)
      .populate("parentSkillCategory", "name")
      .populate({
        path: "projects",
        select: "title",
        model: "Project",
      });

    console.log("Fetched skills:", skills);

    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for fetching recent skills
router.get('/recent', async (req, res) => {
  try {
    const recentSkills = await Skill.find().sort({ createdAt: -1 }).limit(3); // Adjust limit as needed
    res.status(200).json(recentSkills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent skills' });
  }
});


// Route for getting a single skill
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate(
      "parentSkillCategory",
      "name"
    ); // Populate parentSkillCategory with its name

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Find projects associated with this skill ID
    const projects = await Project.find({ skills: req.params.id }).select(
      "title"
    );

    res.json({
      skill,
      projects,
    });
  } catch (error) {
    console.error("Error fetching skill and associated projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route for creating a new skill
router.post(
  "/",
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('parentSkillCategory').optional().isMongoId().withMessage('Invalid category ID'),
    body('rating').optional().isNumeric().withMessage('Rating should be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = new Skill({
      name: req.body.name,
      parentSkillCategory: req.body.parentSkillCategory,
      rating: req.body.rating,
      icon: req.body.icon,
    });

    try {
      const newSkill = await skill.save();
      res.status(201).json(newSkill);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Route for updating a skill
router.patch(
  "/:id",
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('parentSkillCategory').optional().isMongoId().withMessage('Invalid category ID'),
    body('rating').optional().isNumeric().withMessage('Rating should be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const skill = await Skill.findById(req.params.id);
      if (!skill) return res.status(404).json({ message: "Skill not found" });

      if (req.body.name != null) skill.name = req.body.name;
      if (req.body.parentSkillCategory != null)
        skill.parentSkillCategory = req.body.parentSkillCategory;
      if (req.body.rating != null) skill.rating = req.body.rating;
      if (req.body.icon != null) skill.icon = req.body.icon;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);


// Route for deleting a skill
router.delete("/:id", async (req, res) => {
  try {
    const skillId = req.params.id;

    // Find all projects that have this skill in their skills array
    const projects = await Project.find({ skills: skillId });

    // Remove the skill from each project's skills array
    for (let project of projects) {
      project.skills = project.skills.filter(
        (skill) => skill.toString() !== skillId
      );
      await project.save();
    }

    // Delete the skill itself
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
