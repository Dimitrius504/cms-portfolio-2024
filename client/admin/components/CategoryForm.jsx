import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ onAddData }) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const newCategory = { name };
      await axios.post("/api/categories", newCategory);
      onAddData(newCategory);
      setName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} id="categoryForm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
