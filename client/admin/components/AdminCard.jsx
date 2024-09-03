import React, { useEffect, useState } from "react";
import Card from "../../src/components/Home/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCard = () => {
  const [recentCategories, setRecentCategories] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentSkills, setRecentSkills] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const [
          categoriesResponse,
          projectsResponse,
          skillsResponse,
          blogsResponse,
        ] = await Promise.all([
          axios.get("/api/categories/recent"),
          axios.get("/api/projects/recent"),
          axios.get("/api/skills/recent"),
          axios.get("/api/blog/recent"),
        ]);

        setRecentCategories(Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []);
        setRecentProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []);
        setRecentSkills(Array.isArray(skillsResponse.data) ? skillsResponse.data : []);
        setRecentBlogs(Array.isArray(blogsResponse.data) ? blogsResponse.data : []);

      } catch (error) {
        console.error("Error fetching recent items:", error);
      }
    };

    fetchRecentItems();
  }, []);

  const renderRecentItems = (items) => {
    return Array.isArray(items) && items.length > 0 ? (
      <ul className="mt-2 mb-4">
        {items.slice(0, 3).map((item, index) => (
          <li key={index} className="text-gray-600">
            {item.name || item.title}
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-2 mb-4 text-gray-600">No recent items</p>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
      <Card>
        <h2 className="text-2xl font-bold text-center">Categories</h2>
        <p className="mt-4 text-center">Recent Categories</p>
        {renderRecentItems(recentCategories)}
        <Link
          to="/admin/categories"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-4"
        >
          Add Categories
        </Link>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-center">Projects</h2>
        <p className="mt-4 text-center">Recent Projects</p>
        {renderRecentItems(recentProjects)}
        <Link
          to="/admin/projects"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-4"
        >
          Add Projects
        </Link>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-center">Skills</h2>
        <p className="mt-4 text-center">Recent Skills</p>
        {renderRecentItems(recentSkills)}
        <Link
          to="/admin/skills"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-4"
        >
          Add Skills
        </Link>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-center">Blogs</h2>
        <p className="mt-4 text-center">Recent Blogs</p>
        {renderRecentItems(recentBlogs)}
        <Link
          to="/blog/new"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-4"
        >
          Add Blog
        </Link>
      </Card>
    </div>
  );
};

export default AdminCard;
