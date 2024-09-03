import React, { useState, useRef } from "react";
import HeroContents from "../components/Home/HeroContents";
import ProjectComponent from "../components/Portfolio/ProjectComponent";
import PortfolioItems from "../components/Portfolio/ProjectsData";
import ProjectPopup from "../components/Portfolio/ProjectPopup";
import "../components/Portfolio/projects.css";

const Projects = () => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const technologyButtonsRef = useRef(null);

  const filterProjectsByTechnology = (technology) => {
    setSelectedTechnology(technology);
  };

  const openPopup = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <HeroContents
        title="Projects"
        subtitle="See Some Of my Projects"
        bg="bg-indigo-700"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-4 overflow-x-auto relative scroll-container">
          <div className="flex space-x-2" ref={technologyButtonsRef}>
            {PortfolioItems.reduce((technologies, project) => {
              project.technologies.forEach((technology) => {
                if (!technologies.includes(technology)) {
                  technologies.push(technology);
                }
              });
              return technologies;
            }, []).map((technology, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md focus:outline-none ${selectedTechnology === technology
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                  }`}
                onClick={() => filterProjectsByTechnology(technology)}
              >
                {technology}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PortfolioItems.filter((project) =>
            selectedTechnology
              ? project.technologies.includes(selectedTechnology)
              : true
          ).map((project) => (
            <ProjectComponent
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              onClick={() => openPopup(project)}
            />
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <ProjectPopup project={selectedProject} closePopup={closePopup} />
      )}
    </>
  );
};

export default Projects;
