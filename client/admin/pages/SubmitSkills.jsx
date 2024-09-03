import React, { useState, useEffect } from "react";
import SkillsForm from "../components/SkillsForm";
import axios from "axios";
import { iconMapping } from "../components/IconMapping.js";

const SubmitSkills = () => {
  const [skills, setSkills] = useState([]);
  const [iconComponents, setIconComponents] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data);

        const icons = await loadIcons(response.data);
        setIconComponents(icons);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

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
                  <span className="text-gray-600 ml-2">
                    Rating: {skill.rating}
                  </span>
                </div>
              </div>
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
