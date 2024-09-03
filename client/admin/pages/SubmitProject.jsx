import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";

const SubmitProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        console.log("Projects:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white shadow-md rounded p-4">
            <a href={`/admin/project/${project._id}`} className="text-blue-600 mb-2 block" target="_blank" rel="noopener noreferrer">
              See Project
            </a>
            <h2 className="text-lg font-bold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <p className="text-blue-600 mb-2">
              GitHub Link:{" "}
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                {project.githubLink}
              </a>
            </p>
            {project.liveLink && (
              <p className="text-blue-600 mb-2">
                Live Link:{" "}
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  {project.liveLink}
                </a>
              </p>
            )}
            <p className="text-gray-600">Date: {new Date(project.date).toLocaleDateString()}</p>
            <p className="mt-2">
              Skills:{" "}
              {project.skills.map((skill, index) => (
                <span key={skill._id} className={`mr-2 ${index !== project.skills.length - 1 ? 'mb-2' : ''}`}>
                  {skill.name}
                </span>
              ))}
            </p>
          </div>
        ))}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-bold mb-4">Add New Project</h2>
          <ProjectForm />
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;
