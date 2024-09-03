import React, { useEffect, useState } from 'react';
import EmailForm from '../components/Contact/EmailForm.jsx';
import HeroContents from '../components/Home/HeroContents.jsx';
import axios from 'axios';

const Contact = () => {

  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching job status:', error);
      }
    }

    fetchJobStatus();
  }, []);
  return (
    <>
      <HeroContents
        title="Contact Me"
        subtitle="Don't hesitate to reach out to me!"
        bg="bg-indigo-700"
      />
      <div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              <p className="text-gray-700"><strong>Email:</strong> dimitriusmckinnon419@gmail.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (705) 321-9729</p>
              <p className="text-gray-700"><strong>Company:</strong> {status?.details}</p>
              <p className="text-gray-700"><strong>Address:</strong> 59 Courtland St. Orillia, ON, Canada</p>
            </div>
            <div className="w-full md:w-1/2">
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Contact;
