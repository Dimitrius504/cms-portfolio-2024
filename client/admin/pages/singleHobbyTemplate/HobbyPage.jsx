import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const HobbyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        image: null,
    });

    useEffect(() => {
        const fetchHobby = async () => {
            try {
                const response = await axios.get(`/api/about/hobbies/${id}`);
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    imageUrl: response.data.imageUrl,
                    image: null,
                });
            } catch (error) {
                console.error('Error fetching hobby:', error);
            }
        };

        fetchHobby();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await axios.put(`/api/about/hobbies/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin/about');
        } catch (error) {
            console.error('Error updating hobby:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/about/hobbies/${id}`);
            navigate('/admin/about');
        } catch (error) {
            console.error('Error deleting hobby:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {formData.imageUrl && !formData.image && (
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Current Image:</label>
                    <img
                        src={formData.imageUrl}
                        alt={formData.title}
                        className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-4"
                    />
                </div>
            )}

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Upload New Image:</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-black rounded-md shadow hover:bg-green-700 transition"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-black rounded-md shadow hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </form>
    );
};

export default HobbyPage;
