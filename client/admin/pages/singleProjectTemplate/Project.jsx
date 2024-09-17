import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [editedProject, setEditedProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    date: "",
    skills: [],
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data);
        setEditedProject({
          title: response.data.title,
          description: response.data.description,
          githubLink: response.data.githubLink,
          liveLink: response.data.liveLink || "",
          date: response.data.date,
          skills: response.data.skills.map((skill) => skill._id),
        });
        console.log("Fetched project date:", response.data.date);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    if (id) {
      fetchProject();
    }
    fetchSkills();
  }, [id]);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox" && name === "skills") {
      const skillId = value;
      const updatedSkills = checked
        ? [...editedProject.skills, skillId]
        : editedProject.skills.filter((id) => id !== skillId);
  
      setEditedProject((prev) => ({
        ...prev,
        skills: updatedSkills,
      }));
    } else if (type === "checkbox" && name === "isKeyProject") {
      setEditedProject((prev) => ({
        ...prev,
        isKeyProject: checked,
      }));
    } else if (type === "date") {
      const parsedDate = new Date(value).toISOString();
      setEditedProject((prev) => ({
        ...prev,
        date: parsedDate,
      }));
    } else {
      setEditedProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/projects/${id}`, editedProject);
      console.log("Project updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating project:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/projects/${id}`);
      console.log("Project deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  if (!project || !skills.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedProject.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedProject.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="githubLink"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              GitHub Link
            </label>
            <input
              type="text"
              id="githubLink"
              name="githubLink"
              value={editedProject.githubLink}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="liveLink"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Live Link (optional)
            </label>
            <input
              type="text"
              id="liveLink"
              name="liveLink"
              value={editedProject.liveLink}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Key Project
            </label>
            <input
              type="checkbox"
              id="isKeyProject"
              name="isKeyProject"
              checked={editedProject.isKeyProject || false}
              onChange={handleChange}
              className="leading-tight"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={editedProject.date ? formattedDate(editedProject.date) : ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Skills
            </label>
            {skills.map((skill) => (
              <div key={skill._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={skill._id}
                  name="skills"
                  value={skill._id}
                  checked={editedProject.skills.includes(skill._id)}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <label htmlFor={skill._id} className="text-gray-700">
                  {skill.name}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Project
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Project;
