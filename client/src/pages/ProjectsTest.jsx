import React, { useState, useRef, useEffect } from "react";
import HeroContents from "../components/Home/HeroContents";
import ProjectComponent from "../components/Portfolio/ProjectComponent";
import ProjectPopup from "../components/Portfolio/ProjectPopup";
import "../components/Portfolio/projects.css";
import axios from "axios";

const ProjectsTest = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [projects, setProjects] = useState([]);
  const technologyButtonsRef = useRef(null);

  const filterProjectsBySkill = (skillId) => {
    setSelectedSkill(skillId);
  };

  useEffect(() => {
    const retrieveProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);

        const skills = response.data.flatMap(project => project.skills);
        const uniqueSkills = skills.reduce((acc, skill) => {
          if (!acc.find(s => s._id === skill._id)) {
            acc.push(skill);
          }
          return acc;
        }, []);
        setSkillsList(uniqueSkills);
      } catch (error) {
        console.error(error);
      }
    };
    retrieveProjects();
  }, []);

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
            {skillsList.map((skill) => (
              <button
                key={skill._id}
                className={`px-4 py-2 rounded-md focus:outline-none ${selectedSkill === skill._id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                  }`}
                onClick={() => filterProjectsBySkill(skill._id)}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter((project) =>
            selectedSkill
              ? project.skills.some(skill => skill._id === selectedSkill)
              : true
          ).map((project) => (
            <ProjectComponent
              key={project._id}
              title={project.title}
              description={project.description}
              technologies={project.skills.map(skill => skill.name)}
              projectLink={project.liveLink}
              githubLink={project.githubLink}
              date={project.date}
              isKeyProject={project.isKeyProject}
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

export default ProjectsTest;
