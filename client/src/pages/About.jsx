import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroContents from '../components/Home/HeroContents';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('/api/about/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    }
    fetchExperiences();
  }, []);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get('/api/about/education');
        setEducation(response.data);
      } catch (error) {
        console.error('Error fetching education:', error);
      }
    }
    fetchEducation();
  }, []);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await axios.get('/api/about/hobbies');
        setHobbies(response.data);
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      }
    }
    fetchHobbies();
  }, []);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await axios.get('/api/about/bio');
        setBio(response.data.summary);
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    }
    fetchBio();
  }, []);

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

  return (
    <>
      <HeroContents
        title="About Me"
        subtitle="Discover more about my journey, expertise, and passions."
        bg="bg-indigo-700"
      />
      <div className="container mx-auto px-6 py-12">

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">Bio</h2>
          <p className="text-xl text-gray-700 shadow-lg p-6 rounded-lg">
            {bio}
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? skills.map((skill) => (
              <span key={skill._id} className="bg-blue-100 text-blue-700 text-xl font-medium px-4 py-2 rounded-full shadow transition-colors duration-300">
                {skill?.name}
              </span>
            )) : <p className="text-xl text-gray-700">No skills available at the moment.</p>}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">Experience</h2>
          <div className="space-y-8">
            {experiences.length > 0 ? experiences.map((experience) => (
              <div key={experience._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-semibold">{experience.jobTitle} at {experience.companyName}</h3>
                <p className="text-gray-600 italic">{new Date(experience.startDate).toLocaleDateString()} - {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
                <p className="text-xl text-gray-700">{experience.description}</p>
              </div>
            )) : <p className="text-xl text-gray-700">No experiences available at the moment.</p>}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">Education</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {education.length > 0 ? education.map((edu) => (
              <div key={edu._id}>
                <h3 className="text-3xl font-semibold">{edu.degreeTitle}</h3>
                <p className="text-gray-600 italic">{edu.institutionName}, {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}</p>
                <p className='text-xl text-gray-700'>{edu.description}</p>
              </div>
            )) : <p className="text-xl text-gray-700">No education details available at the moment.</p>}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">Hobbies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hobbies.length > 0 ? hobbies.map((hobby) => (
              <div key={hobby._id} className="shadow-lg p-6 rounded-lg bg-white flex flex-col items-center text-center">
                <h3 className="text-2xl font-semibold mb-2">{hobby.title}</h3>
                {hobby.imageUrl && (
                  <img src={hobby.imageUrl} alt={hobby.title} className="w-32 h-32 object-cover rounded-full shadow mb-4" />
                )}
                <p className="text-lg text-gray-700">{hobby.description}</p>
              </div>
            )) : <p className="text-xl text-gray-700">No hobbies available at the moment.</p>}
          </div>
        </section>


      </div>
    </>
  );
}

export default About;
