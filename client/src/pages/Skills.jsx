import React, { useState } from "react";
import { Link } from "react-router-dom";
import SkillsCards from "../components/Skills/SkillsCards";
import HeroContents from "../components/Home/HeroContents";
import { IoLogoReact } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { BsBootstrapFill } from "react-icons/bs";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiHandlebarsdotjs } from "react-icons/si";
import { FaAngular } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiCsharp } from "react-icons/si";
import { AiOutlineDotNet } from "react-icons/ai";
import { GrMysql } from "react-icons/gr";
import { SiMongodb } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { SiAdobeillustrator } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { LiaDocker } from "react-icons/lia";
import { AiFillDropboxCircle } from "react-icons/ai";
import { AiFillSlackCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import * as icons from 'react-icons'

const skillsData = [
  {
    category: "Frontend Skills",
    skills: [
      { name: "React", rating: "8", icon: <IoLogoReact /> },
      { name: "HTML", rating: "9", icon: <FaHtml5 /> },
      { name: "Javascript", rating: "9", icon: <SiJavascript /> },
      { name: "CSS", rating: "10", icon: <FaCss3Alt /> },
      { name: "Bootstrap", rating: "9", icon: <BsBootstrapFill /> },
      { name: "Tailwind", rating: "5", icon: <RiTailwindCssFill /> },
      { name: "Handlebars", rating: "8", icon: <SiHandlebarsdotjs /> },
      { name: "Angular", rating: "4", icon: <FaAngular /> },
    ],
  },
  {
    category: "Backend Skills",
    skills: [
      { name: "Express", rating: "8", icon: <SiExpress /> },
      { name: "Node.Js", rating: "8", icon: <FaNodeJs /> },
      { name: "C#", rating: "4", icon: <SiCsharp /> },
      { name: "ASP.NET", rating: "6", icon: <AiOutlineDotNet /> },
    ],
  },
  {
    category: "Database Skills",
    skills: [
      { name: "SQL Database", rating: "7", icon: <GrMysql /> },
      { name: "MongoDB", rating: "8", icon: <SiMongodb /> },
    ],
  },
  {
    category: "Design & Tools",
    skills: [
      { name: "Adobe Photoshop", rating: "7", icon: <SiAdobephotoshop /> },
      { name: "Adobe Illustrator", rating: "8", icon: <SiAdobeillustrator /> },
      { name: "Figma", rating: "7", icon: <FaFigma /> },
      { name: "Docker", rating: "6", icon: <LiaDocker /> },
    ],
  },
  {
    category: "Collaboration & Version-Control",
    skills: [
      { name: "Dropbox", rating: "8", icon: <AiFillDropboxCircle /> },
      { name: "Slack", rating: "10", icon: <AiFillSlackCircle /> },
      { name: "Github", rating: "8", icon: <FaGithub /> },
    ],
  },
];

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardClick = (skills, category) => {
    setSelectedSkills(skills);
    setSelectedCategory(category);
  };

  return (
    <div>
      <HeroContents
        title="Skills"
        subtitle="Details Of My Skills"
        bg="bg-indigo-700"
      />
      <section className="p-4">
        <div className="flex">
          <div className="w-1/3 p-4 bg-gray-100 shadow-lg rounded-lg">
            {selectedSkills ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedCategory}
                </h2>
                {selectedSkills.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="w-1/4 flex items-center">
                      <div className="mr-2">{skill.icon}</div>
                      <Link to={`/projects#${skill.name}`}><div>{skill.name}</div></Link>
                      <Link to={`/skills/${skill._id}`} />
                    </div>
                    <div className="w-1/2 h-3 relative bg-gray-200 rounded">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded"
                        style={{ width: `${(skill.rating / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-1/4 text-right">{skill.rating}/10</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Select a category to see skills
                </h2>
              </div>
            )}
          </div>
          <div className="w-2/3 flex flex-wrap">
            {skillsData.map((skillSet, index) => (
              <SkillsCards
                key={index}
                category={skillSet.category}
                onClick={() =>
                  handleCardClick(skillSet.skills, skillSet.category)
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;