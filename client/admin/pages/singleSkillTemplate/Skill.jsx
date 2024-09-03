import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IconsManifest } from "react-icons/lib";

const Skill = () => {
  const [skill, setSkill] = useState(null);
  const [editedSkill, setEditedSkill] = useState({
    name: "",
    icon: "",
    parentSkillCategory: "",
    rating: "",
  });
  const [parentSkillCategories, setParentSkillCategories] = useState([]);
  const [IconComponent, setIconComponent] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`/api/skills/${id}`);
        const fetchedSkill = response.data.skill;

        setSkill(fetchedSkill);
        setEditedSkill({
          name: fetchedSkill?.name || "",
          icon: fetchedSkill?.icon || "",
          parentSkillCategory: fetchedSkill?.parentSkillCategory._id || "",
          rating: fetchedSkill?.rating?.toString() || "",
        });

        loadIcon(fetchedSkill?.icon);
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setParentSkillCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSkill();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "icon") {
      loadIcon(value);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setEditedSkill((prev) => ({
      ...prev,
      parentSkillCategory: selectedCategoryId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editedSkill.name || !editedSkill.icon || !editedSkill.rating) {
      setError("All fields are required.");
      return;
    }
    try {
      await axios.patch(`/api/skills/${id}`, editedSkill);
      console.log("Skill updated successfully!");
      setError(null);
    } catch (error) {
      console.error("Error updating skill:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const loadIcon = async (iconName) => {
    if (!iconName) return;
    const iconManifest = IconsManifest.find((manifest) =>
      Object.keys(manifest?.icons).some((key) => key === iconName)
    );
    if (!iconManifest) {
      console.error(`No icon found for name: ${iconName}`);
      setIconComponent(null);
      return;
    }
    try {
      const { [iconName]: ImportedIcon } = await import(`${iconManifest.package}/lib`);
      setIconComponent(() => ImportedIcon);
    } catch (error) {
      console.error("Error importing icon:", error);
      setIconComponent(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {skill && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Skill</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              placeholder="Enter skill name"
              type="text"
              id="name"
              name="name"
              value={editedSkill.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
              Icon
            </label>
            <div className="flex items-center mt-1">
              <input
                placeholder="Enter icon name"
                type="text"
                id="icon"
                name="icon"
                value={editedSkill.icon}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {IconComponent && <IconComponent size={30} className="ml-2" />}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="parentSkillCategory" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="parentSkillCategory"
              name="parentSkillCategory"
              value={editedSkill.parentSkillCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              {parentSkillCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              placeholder="Enter rating"
              type="number"
              id="rating"
              name="rating"
              value={editedSkill.rating}
              onChange={handleChange}
              min="1"
              max="10"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Skill
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Skill;
