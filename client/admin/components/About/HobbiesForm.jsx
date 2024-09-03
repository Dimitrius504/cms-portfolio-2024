import React, { useState } from 'react';
import FileInput from './FileInput';

const HobbiesForm = ({ hobby, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: hobby.title || '',
        description: hobby.description || '',
        image: hobby.image || null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        onSubmit(data);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            {formData.image && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Image:</label>
                    <img src={URL.createObjectURL(formData.image)} alt="Current Hobby" className="max-w-xs rounded-lg mb-2" />
                </div>
            )}
            <FileInput
                label="Replace Image"
                name="image"
                onChange={handleChange}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Save Changes
            </button>
        </form>
    );
};

export default HobbiesForm;
