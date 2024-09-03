import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BioForm from '../components/About/BioForm';
import ExperienceForm from '../components/About/ExperienceForm';
import EducationForm from '../components/About/EducationForm';
import HobbiesForm from '../components/About/HobbiesForm';
import { useUser } from '../../src/context/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminAboutPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [bio, setBio] = useState({
        summary: '',
    });

    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bioRes, expRes, eduRes, hobRes] = await Promise.all([
                    axios.get('/api/about/bio'),
                    axios.get('/api/about/experiences'),
                    axios.get('/api/about/education'),
                    axios.get('/api/about/hobbies'),
                ]);

                setBio(bioRes.data || { summary: '' });
                setExperiences(Array.isArray(expRes.data) ? expRes.data : []);
                setEducation(Array.isArray(eduRes.data) ? eduRes.data : []);
                setHobbies(Array.isArray(hobRes.data) ? hobRes.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleBioSubmit = async (formData) => {
        try {
            const response = await axios.put('/api/about/bio', formData);
            setBio(response.data);
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    const handleExperienceSubmit = async (formData) => {
        try {
            const response = await axios.post('/api/about/experiences', formData);
            setExperiences([...experiences, response.data]);
        } catch (error) {
            console.error('Error adding experience:', error);
        }
    };

    const handleEducationSubmit = async (formData) => {
        try {
            const response = await axios.post('/api/about/education', formData);
            setEducation([...education, response.data]);
        } catch (error) {
            console.error('Error adding education:', error);
        }
    };

    const handleHobbiesSubmit = async (formData) => {
        try {
            const response = await axios.post('/api/about/hobbies', formData);
            setHobbies([...hobbies, response.data]);
        } catch (error) {
            console.error('Error adding hobby:', error);
        }
    };

    const handleDelete = async (type, id) => {
        try {
            await axios.delete(`/api/about/${type}/${id}`);
            if (type === 'experiences') {
                setExperiences(experiences.filter(item => item._id !== id));
            } else if (type === 'education') {
                setEducation(education.filter(item => item._id !== id));
            } else if (type === 'hobbies') {
                setHobbies(hobbies.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto p-4 border rounded">
            <h1 className="text-2xl font-bold mb-4">Edit About Me</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section>
                    <h2 className="text-xl font-semibold">Bio</h2>
                    <BioForm bio={bio} onSubmit={handleBioSubmit} />
                </section>
                <section>
                    <h2 className="text-xl font-semibold">Experience</h2>
                    <ExperienceForm experience={{}} onSubmit={handleExperienceSubmit} />
                </section>
                <section>
                    <h2 className="text-xl font-semibold">Education</h2>
                    <EducationForm education={{}} onSubmit={handleEducationSubmit} />
                </section>
                <section>
                    <h2 className="text-xl font-semibold">Hobbies</h2>
                    <HobbiesForm hobby={{}} onSubmit={handleHobbiesSubmit} />
                </section>
            </div>

            <div className="space-y-6 mt-8">
                <section>
                    <h2 className="text-xl font-semibold">Experiences</h2>
                    <ul className="space-y-4">
                        {experiences.map((experience, index) => (
                            <li key={index} className="p-4 border rounded shadow-sm flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{experience.jobTitle} at {experience.companyName}</h3>
                                    <p>{formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}</p>
                                    <p>{experience.description}</p>
                                    <p className="text-sm text-gray-500">{experience.location}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/edit/experience/${experience._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete('experiences', experience._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">Education</h2>
                    <ul className="space-y-4">
                        {education.map((edu, index) => (
                            <li key={index} className="p-4 border rounded shadow-sm flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{edu.degreeTitle} at {edu.institutionName}</h3>
                                    <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                                    <p>{edu.description}</p>
                                    <p className="text-sm text-gray-500">{edu.location}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/edit/education/${edu._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete('education', edu._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold">Hobbies</h2>
                    <ul className="space-y-4">
                        {hobbies.map((hobby, index) => (
                            <li key={index} className="p-4 border rounded shadow-sm flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{hobby.title}</h3>
                                    <p>{hobby.description}</p>
                                    {hobby.imageUrl && (
                                        <img src={hobby.imageUrl} alt={hobby.title} className="mt-2 max-w-xs rounded shadow" />
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/edit/hobbies/${hobby._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete('hobbies', hobby._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <button
                type="button"
                onClick={() => navigate('/account')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-8"
            >
                Back to Profile
            </button>
        </div>
    );
};

export default AdminAboutPage;
