import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ExperiencePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await axios.get(`/api/about/experiences/${id}`);
                setFormData({
                    jobTitle: response.data.jobTitle,
                    companyName: response.data.companyName,
                    description: response.data.description,
                    location: response.data.location,
                    startDate: response.data.startDate.split('T')[0],
                    endDate: response.data.endDate ? response.data.endDate.split('T')[0] : '',
                });
            } catch (error) {
                console.error('Error fetching experience:', error);
            }
        };

        fetchExperience();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/about/experiences/${id}`, formData);
            navigate('/admin/about');
        } catch (error) {
            console.error('Error updating experience:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/about/experiences/${id}`);
            navigate('/admin/about');
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Job Title:</label>
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Company Name:</label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
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

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">End Date (or Present):</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </form>
    );
};

export default ExperiencePage;
