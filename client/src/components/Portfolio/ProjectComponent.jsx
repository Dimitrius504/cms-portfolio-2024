import React from "react";

const ProjectComponent = ({
  title, description, technologies, projectLink, githubLink, date, onClick, isKeyProject
}) => {
  const handleClick = () => {
    onClick({ title, description, technologies, projectLink, githubLink, date });
  };

  const maxDescriptionLength = 100;
  const displayDescription = description.length > maxDescriptionLength ?
    `${description.substring(0, maxDescriptionLength)}... ` : description;

  return (
    <div className={`project ${isKeyProject ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-white"} shadow-md p-6 rounded-lg relative`} onClick={handleClick}>
      {isKeyProject && (
        <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-sm font-semibold rounded-full absolute top-2 right-2">Key Project</span>
      )}
      <h3 className="text-xl font-semibold mb-2 truncate-text">{title}</h3>
      <p className="text-gray-700 mb-4 truncate-text">
        {displayDescription}
        {description.length > maxDescriptionLength && (
          <span className="text-blue-500 cursor-pointer">Read more</span>
        )}
      </p>
      <ul className="flex flex-wrap">
        {technologies.map((tech, index) => (
          <li
            key={index}
            className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 mr-2 mb-2"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectComponent;
