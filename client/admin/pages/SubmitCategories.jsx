import React, { useState, useEffect } from "react";
import CategoryForm from "../components/CategoryForm";
import axios from "axios";

const SubmitCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState({
    id: "",
    name: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditClick = (category) => {
    setEditedCategory({
      id: category._id,
      name: category.name,
    });
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      name: e.target.value,
    });
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.patch(`/api/categories/${editedCategory.id}`, {
        name: editedCategory.name,
      });
      fetchCategories();
      setEditMode(false);
      setEditedCategory({
        id: "",
        name: "",
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCategory({
      id: "",
      name: "",
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CategoryForm onAddData={fetchCategories} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Fetched Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="border-b py-2">
              {editMode && editedCategory.id === category._id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedCategory.name}
                    onChange={handleEditChange}
                    className="border rounded py-1 px-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUpdateCategory}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <div>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    >Edit</button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubmitCategories;
