import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSkillChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post("/api/categories", { name: categoryName });
      setCategories([...categories, response.data]);
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddSkill = () => {
    const newSkill = { name: skillName };
    setSkills([...skills, newSkill]);
    setSkillName("");
  };

  const handleSkillCheckboxChange = (event, skill) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name: categoryName,
      skills: selectedSkills.map(skill => skill._id),
    };

    try {
      const response = await axios.post("/api/categories", categoryData);
      console.log("Category and skills added successfully:", response.data);
    } catch (error) {
      console.error("Error adding category and skills:", error);
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={handleCategoryChange}
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <h2>Add Skill</h2>
      <input
        type="text"
        placeholder="Skill Name"
        value={skillName}
        onChange={handleSkillChange}
      />
      <button onClick={handleAddSkill}>Add Skill</button>

      <h2>Associate Skills</h2>
      {skills.map((skill, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={(event) => handleSkillCheckboxChange(event, skill)}
            />
            {skill.name}
          </label>
        </div>
      ))}

      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CategoryForm;
