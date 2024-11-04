import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeDisplay = () => {
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const { data } = await axios.get('/api/resume/');
                setResumeUrl(data);
            } catch (error) {
                console.error('Failed to fetch resume:', error);
            }
        };

        fetchResume();
    }, []);

    return (
        <div>
            {resumeUrl ? (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Download Latest Resume</a>
            ) : (
                <p>No resume available.</p>
            )}
        </div>
    );
};

export default ResumeDisplay;
