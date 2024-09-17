import React, { useState, useEffect } from "react";

const ProjectPopup = ({ project, closePopup }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    if (project.githubLink === "N/A" || project.liveLink === "N/A") {
      setShowNotification(true);
      setNotificationMessage("Sorry, the live link or GitHub link is private due to security purposes.");
    } else {
      setShowNotification(false);
    }
  }, [project.githubLink, project.liveLink]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg overflow-auto project-popup">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-800 mb-6">{project.description}</p>
        <div className="space-y-2">
          {project.liveLink !== "N/A" ? (
            <p>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                Live Project
              </a>
            </p>
          ) : null}
          {project.githubLink !== "N/A" ? (
            <p>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                GitHub Repository
              </a>
            </p>
          ) : null}
        </div>
        {showNotification && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Notice:</strong>
            <span className="block sm:inline"> {notificationMessage}</span>
          </div>
        )}
        <p className="text-gray-600 mb-4"><small>{new Date(project.date).toLocaleDateString()}</small></p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full py-1 px-3"
            >
              {tech.name}
            </span>
          ))}
        </div>
        <button
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-indigo-700"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectPopup;
