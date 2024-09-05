import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkillsCards from "../components/Skills/SkillsCards";
import HeroContents from "../components/Home/HeroContents";
import axios from "axios";
import { iconMapping } from "../../admin/components/IconMapping.js";

const overallDevStartDate = new Date('2022-09-01');

const SkillsTest = () => {
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skillDataSet, setSkillDataSet] = useState({
    categories: [],
  });
  const [iconComponents, setIconComponents] = useState({});

  const handleCardClick = async (category) => {
    try {
      const response = await axios.get(`/api/skills?categoryId=${category._id}`);
      const categorySkills = response.data.map(skill => {
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
      setSelectedSkills(categorySkills);
      setSelectedCategory(category.name);
      await loadIcons(categorySkills);
    } catch (error) {
      console.error("Error fetching skills for the category:", error);
    }
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

  const calculateExperienceRating = (startDate, endDate = new Date()) => {
    const overallExperience = (endDate - overallDevStartDate) / (1000 * 3600 * 24 * 365);
    const skillExperience = (endDate - startDate) / (1000 * 3600 * 24 * 365);
    const rating = (skillExperience / overallExperience) * 100;
    return Math.min(100, Math.max(0, rating));
  };

  const calculateDurationText = (startDate, endDate) => {
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`.trim();
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
    setIconComponents((prevIcons) => ({ ...prevIcons, ...icons }));
  };

  useEffect(() => {
    const retrieveCategoryData = async () => {
      try {
        const response = await axios.get("/api/categories");
        setSkillDataSet({
          categories: response.data,
        });
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };
    retrieveCategoryData();
  }, []);

  return (
    <div>
      <HeroContents
        title="Skills"
        subtitle="Details Of My Skills"
        bg="bg-indigo-700"
      />
      <section className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4 bg-gray-100 shadow-lg rounded-lg">
            {selectedSkills ? (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  {selectedCategory}
                </h2>
                {selectedSkills.map((skill) => (
                  <div key={skill._id} className="flex flex-col mb-4 md:mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-1/4 flex items-center justify-center">
                        {iconComponents[skill._id] ? (
                          React.createElement(iconComponents[skill._id], { size: 24, className: "text-blue-500" })
                        ) : (
                          <span className="text-gray-400">No Icon</span>
                        )}
                      </div>
                      <div className="flex flex-col w-3/4">
                        <Link to={`/projects#${skill.name}`} className="text-lg font-medium">{skill.name}</Link>
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${skill.experienceRating}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500">{skill.durationText || 'Less than a month'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Select a category to see skills
                </h2>
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap">
            {skillDataSet.categories.map((category, index) => (
              <SkillsCards
                key={index}
                category={category.name}
                onClick={() => handleCardClick(category)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


export default SkillsTest;