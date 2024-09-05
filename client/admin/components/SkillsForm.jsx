import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ReactIcons from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const overallDevStartDate = new Date('2022-09-01');


const SkillsForm = () => {
  const [parentSkillCategories, setParentSkillCategories] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [rating, setRating] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [experienceRating, setExperienceRating] = useState(0);

  useEffect(() => {
    const fetchParentSkillCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setParentSkillCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchParentSkillCategories();
  }, []);

  const calculateExperienceRating = (start, end = new Date()) => {
    const overallExperience = (new Date() - overallDevStartDate) / (1000 * 3600 * 24 * 365); // in years
    const skillExperience = (end - new Date(start)) / (1000 * 3600 * 24 * 365); // in years
    const rating = (skillExperience / overallExperience) * 100; // percentage of overall experience
    return Math.min(100, Math.max(0, rating));
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    const rating = calculateExperienceRating(start, end);
    setExperienceRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSkill = {
        name,
        icon,
        rating: experienceRating,
        parentSkillCategory: selectedCategory,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
      };

      console.log("Submitting new skill:", newSkill);

      const response = await axios.post("/api/skills", newSkill);
      console.log("Skill added successfully:", response.data);

      setName("");
      setIcon("");
      setSelectedCategory("");
      setStartDate(new Date());
      setEndDate(null);
      setExperienceRating(0);
    } catch (error) {
      console.error("Error adding skill:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} id="skillForm" className="bg-white shadow-md rounded-lg px-6 py-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Skill Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="parentSkillCategory" className="block text-sm font-medium text-gray-700">
            Parent Skill Category
          </label>
          <select
            id="parentSkillCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Category
            </option>
            {parentSkillCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Icon Name
          </label>
          <input
            type="text"
            id="icon"
            placeholder="Enter Icon Name"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            placeholder="Enter Rating (1-10)"
            value={rating}
            min="1"
            max="10"
            onChange={(e) => setRating(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date (optional)
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            isClearable
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="experienceBar" className="block text-sm font-medium text-gray-700">
            Skill Experience
          </label>
          <div className="w-full bg-gray-200 rounded h-2">
            <div className="bg-green-500 h-2 rounded" style={{ width: `${experienceRating}%` }}></div>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default SkillsForm;
