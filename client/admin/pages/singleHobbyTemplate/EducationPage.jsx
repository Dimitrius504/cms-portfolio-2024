import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EducationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        degreeTitle: '',
        institutionName: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get(`/api/about/education/${id}`);
                setFormData({
                    degreeTitle: response.data.degreeTitle,
                    institutionName: response.data.institutionName,
                    description: response.data.description,
                    location: response.data.location,
                    startDate: response.data.startDate.split('T')[0],
                    endDate: response.data.endDate ? response.data.endDate.split('T')[0] : '',
                });
            } catch (error) {
                console.error('Error fetching education:', error);
            }
        };

        fetchEducation();
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
            await axios.put(`/api/about/education/${id}`, formData);
            navigate('/admin/about');
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/about/education/${id}`);
            navigate('/admin/about');
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white border rounded-lg shadow-md">
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Degree Title:</label>
                <input
                    type="text"
                    name="degreeTitle"
                    value={formData.degreeTitle}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Institution Name:</label>
                <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
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

export default EducationPage;
