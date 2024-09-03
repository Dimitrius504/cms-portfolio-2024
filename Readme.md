Skills.jsx: // Skills.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroContents from "../components/Home/HeroContents";
import dynamicIconImport from '../components/dynamicIconImport'; // Adjust path as needed

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        const skillsWithIcons = response.data.map(skill => {
          const IconComponent = dynamicIconImport(skill.icon); // Import icon dynamically
          return { ...skill, IconComponent };
        });
        setSkillsData(skillsWithIcons);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div>
      <HeroContents
        title="Skills"
        subtitle="Details Of My Skills"
        bg="bg-indigo-700"
      />
      <section className="p-4">
        <div className="flex flex-wrap">
          {skillsData.map((skill, index) => (
            <div key={index} className="w-1/3 p-4 bg-gray-100 shadow-lg rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <div className="w-1/4 flex items-center">
                  <div className="mr-2">{skill.IconComponent && <skill.IconComponent />}</div>
                  <div>{skill.name}</div>
                </div>
                <div className="w-1/2 h-3 relative bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded"
                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="w-1/4 text-right">{skill.rating}/10</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;

dynamicIconImport.jsx: // dynamicIconImport.js
import * as Icons from 'react-icons/io5'; // Import all icons from the desired package

const dynamicIconImport = (iconName) => {
  // Check if the icon exists in react-icons
  const IconComponent = Icons[iconName];

  if (IconComponent) {
    return IconComponent;
  } else {
    console.error(`Icon ${iconName} not found`);
    // Return a default icon or handle error case
    return null; // or return a default icon component
  }
};

export default dynamicIconImport;


addDataForm.jsx: // AddDataForm.js
import React, { useState } from 'react';
import axios from 'axios';
import dynamicIconImport from './dynamicIconImport'; // Adjust path as needed

const AddDataForm = ({ onAddData }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const newSkill = { name, rating, icon };
      await axios.post('/api/skills', newSkill); // Adjust API endpoint as per your backend
      onAddData(newSkill); // Assuming this updates the skillsData in Skills component
      setName('');
      setRating('');
      setIcon('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skill Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Skill Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="0"
        max="10"
        required
      />
      {/* Input for selecting icon */}
      <input
        type="text"
        placeholder="Icon Name (e.g., IoLogoReact)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        required
      />
      <button type="submit">Add Skill</button>
    </form>
  );
};

export default AddDataForm;

iconSearch.jsx: // IconSearch.js
import React, { useState } from 'react';
import dynamicIconImport from './dynamicIconImport';

const IconSearch = ({ onSelectIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleSelectIcon = async (iconName) => {
    setSelectedIcon(iconName);
    try {
      const IconComponent = await dynamicIconImport(iconName);
      onSelectIcon(IconComponent);
    } catch (error) {
      console.error(error);
    }
  };

  // Replace with your list of icon names as needed
  const iconNames = [
    'IoLogoReact',
    'FaHtml5',
    'SiJavascript',
    'FaCss3Alt',
    // Add more icon names as necessary
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {iconNames.map((iconName, index) => (
          <div
            key={index}
            onClick={() => handleSelectIcon(iconName)}
            style={{
              cursor: 'pointer',
              margin: '5px',
              border: selectedIcon === iconName ? '2px solid blue' : '1px solid gray',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            {/* Render a placeholder if icon is not loaded */}
            <span>{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSearch;


