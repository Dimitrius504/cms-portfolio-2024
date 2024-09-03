import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    date: "",
    skills: [],
  });

  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        const { title, description, githubLink, liveLink, date, skills } = response.data;
        setFormData({
          title,
          description,
          githubLink,
          liveLink,
          date: date ? date.split("T")[0] : "",
          skills: skills.map(skill => skill._id),
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (isEditMode) {
      fetchProject();
    }
  }, [id, isEditMode]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, skills: [...formData.skills, value] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requiredFields = [
        "title",
        "description",
        "githubLink",
        "date",
        "skills",
      ];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`${field} is required.`);
        }
      }

      if (isEditMode) {
        await axios.put(`/api/projects/${id}`, formData);
      } else {
        await axios.post("/api/projects", formData);
      }

      console.log("Project saved successfully!");
      setFormData({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
        date: "",
        skills: [],
      });
      setError("");
    } catch (error) {
      console.error("Error saving project:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project description"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="githubLink"
          >
            GitHub Link
          </label>
          <input
            type="text"
            id="githubLink"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter GitHub repository link"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="liveLink"
          >
            Live Link (optional)
          </label>
          <input
            type="text"
            id="liveLink"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter live project link"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Skills:</p>
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <label key={skill._id} className="inline-flex items-center mb-2 mr-4">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill._id}
                  checked={formData.skills.includes(skill._id)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{skill.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditMode ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
