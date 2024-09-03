// routes/projects.js

import express from "express";
import Project from "../models/ProjectSchema.js";
import Skill from "../models/SkillSchema.js";

const router = express.Router();

// Route for getting all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({}).populate("skills", "name");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for fetching recent projects
router.get('/recent', async (req, res) => {
  try {
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(recentProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent projects' });
  }
});

// Route for creating a new project
router.post("/", async (req, res) => {
  const { title, description, githubLink, date, skills } = req.body;
  if (!title || !description || !githubLink || !date || !skills) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const project = new Project({
      title,
      description,
      githubLink,
      liveLink: req.body.liveLink || "",
      date,
      skills,
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for getting a single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('skills', 'name')
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating a project
router.patch("/:id", async (req, res) => {
  try {
    const { title, description, githubLink, liveLink, date, skills } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title;
    project.description = description;
    project.githubLink = githubLink;
    project.liveLink = liveLink || "";
    project.date = new Date(date);

    // Update skills
    if (skills && Array.isArray(skills)) {
      project.skills = skills;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for deleting a project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.deleteOne({ _id: req.params.id });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
