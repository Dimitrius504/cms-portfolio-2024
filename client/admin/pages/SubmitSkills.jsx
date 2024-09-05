import React, { useState, useEffect } from "react";
import SkillsForm from "../components/SkillsForm";
import axios from "axios";
import { iconMapping } from "../components/IconMapping.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const overallDevStartDate = new Date('2022-09-01');



const SubmitSkills = () => {
  const [skills, setSkills] = useState([]);
  const [iconComponents, setIconComponents] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        const updatedSkills = response.data.map(skill => {
          const startDate = new Date(skill.startDate);
          const endDate = skill.endDate ? new Date(skill.endDate) : new Date();
          const experienceRating = calculateExperienceRating(startDate, endDate);
          const durationText = calculateDurationText(startDate, endDate);
          return {
            ...skill,
            experienceRating,
            durationText
          };
        });
        setSkills(updatedSkills);

        const icons = await loadIcons(response.data);
        setIconComponents(icons);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const calculateExperienceRating = (startDate, endDate = new Date()) => {
    const overallExperience = (endDate - overallDevStartDate) / (1000 * 3600 * 24 * 365);
    const skillExperience = (endDate - startDate) / (1000 * 3600 * 24 * 365);
    const rating = (skillExperience / overallExperience) * 100;
    return Math.min(100, Math.max(0, rating));
  };

  const loadIcons = async (skills) => {
    const icons = {};
    for (const skill of skills) {
      const iconName = skill.icon;
      if (iconName) {
        const iconComponent = await loadIcon(iconName);
        if (iconComponent) {
          icons[skill._id] = iconComponent;
        }
      }
    }
    return icons;
  };

  const loadIcon = async (iconName) => {
    if (!iconName) return null;
    const [prefix, ...rest] = iconName.split(/(?=[A-Z])/);
    const iconGroup = iconMapping[prefix];

    if (!iconGroup) {
      console.error(`No icon group found for prefix: ${prefix}`);
      return null;
    }

    const fullIconName = `${prefix}${rest.join('')}`;
    const ImportedIcon = iconGroup[fullIconName];

    if (!ImportedIcon) {
      console.error(`Icon ${fullIconName} not found in group ${prefix}`);
      return null;
    }

    return ImportedIcon;
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await axios.delete(`/api/skills/${skillId}`);
      setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const calculateDurationText = (startDate, endDate) => {
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`.trim();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <SkillsForm />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Skills List</h2>
        <ul className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <li key={skill._id} className="bg-white shadow-md rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {iconComponents[skill._id] ? (
                    React.createElement(iconComponents[skill._id], { size: 30, className: "text-blue-500" })
                  ) : (
                    <span className="text-gray-400">No Icon</span>
                  )}
                </div>
                <div className="ml-3">
                  <span className="font-semibold text-lg">{skill.name}</span>
                  {/* <span className="text-gray-600 ml-2">
                    Rating: {skill.rating}
                  </span> */}

                </div>
                {/* <div className="ml-3">
                  <span>{skill?.startDate}</span>
                </div> */}
                <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${skill?.experienceRating}%` }}></div>
                </div>
              </div>
              <div className="w-full h-3 relative bg-gray-200 rounded mt-1">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded"
                  style={{ width: `${skill?.experienceRating}%` }}
                >

                </div>

              </div>
              <p className="text-xs text-gray-500">{skill.durationText || 'Less than a month'}</p>

              <div>
                <a href={`/admin/skill/${skill._id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                  See Skill
                </a>
                <button onClick={() => handleDeleteSkill(skill._id)} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubmitSkills;
