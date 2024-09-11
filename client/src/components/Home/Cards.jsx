import React, { useState, useEffect } from "react";
import Card from './Card';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useUser } from "../../context/UserContext";


const Cards = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response?.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card className="flex flex-col justify-between w-full h-full">
        <div>
          <h2 className="text-3xl font-bold flex justify-center">Status</h2>
          <h3 className="text-xl">{status?.currentStatus || 'Loading Status...'}</h3>
          <p className="mt-4 mb-4">Working at {status?.details || 'Place of Work Not Specified'}</p>
          <p className="font-bold mt-4 mb-4">Employed Since: {status?.employedSince?.split('T')[0] || 'Date Not Provided'}</p>
        </div>
        <Link
          to="/blog"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
        >
          See Blog Content
        </Link>
      </Card>

      <Card className="flex flex-col justify-between w-full h-full">
        <div>
          <h2 className="text-3xl font-bold flex justify-center">Testimonials</h2>
          {testimonials.length > 0 ? (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <h3 className="text-xl">{testimonials[currentSlide].name}</h3>
                <p className="mt-2 mb-4">{testimonials[currentSlide].text}</p>
                <p className="text-sm text-gray-600">
                  {testimonials[currentSlide].companyName}
                </p>
                <p className="text-sm text-gray-600">
                  Relationship: {testimonials[currentSlide].relationship || 'Not specified'}
                </p>
              </div>
              {user && (
                <Link
                  to="/account"
                  className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 mt-2 self-center"
                >
                  Leave a Testimony
                </Link>
              )}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center mt-4 gap-4">
                  <button onClick={prevSlide} className="bg-gray-200 text-gray-800 rounded-full p-2 shadow hover:bg-gray-300 transition">
                    <FaChevronLeft size={24} />
                  </button>
                  <button onClick={nextSlide} className="bg-gray-200 text-gray-800 rounded-full p-2 shadow hover:bg-gray-300 transition">
                    <FaChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-xl align-left w-full">So quiet...</p>
              <Link
                to="/account"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 mt-8 align-left"
              >
                Be The First!
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Cards;