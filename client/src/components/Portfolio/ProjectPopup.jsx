import React from "react";

const ProjectPopup = ({ project, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-h-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-800 mb-6">{project.description}</p>
        {project.liveLink && (
          <p className="mb-2">
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Live Project
            </a>
          </p>
        )}
        {project.githubLink && (
          <p className="mb-2">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              GitHub Repository
            </a>
          </p>
        )}
        <p className="text-gray-600 mb-4"><small>{new Date(project.date).toLocaleDateString()}</small></p>
        <ul className="flex flex-wrap mb-4">
          {project.skills.map((tech, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 mr-2 mb-2"
            >
              {tech.name}
            </li>
          ))}
        </ul>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectPopup;
