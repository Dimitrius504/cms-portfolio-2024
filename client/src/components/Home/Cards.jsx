import React, { useState, useEffect } from "react";
import Card from './Card';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Cards = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus(response.data);
      }
      catch (error) {
        console.error('Error fetching status:', error);
      }
    }

    fetchStatus();

  }, []);


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data);
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

      <Card className="flex flex-col justify-center relative w-full h-full">
        {testimonials.length > 0 && (
          <div className="grid grid-cols-12 items-center w-full h-full">
            {testimonials.length > 1 && (
              <button
                onClick={prevSlide}
                className="col-span-1 bg-gray-200 text-gray-800 rounded-full w-10 h-10 shadow hover:bg-gray-300 transition z-10 flex justify-center items-center"
              >
                <FaChevronLeft size={16} />
              </button>
            )}

            <div className="col-span-10 text-center">
              <h2 className="text-3xl font-bold">Testimonials</h2>
              <h3 className="text-2xl text-left">{testimonials[currentSlide].name}</h3>
              <p className="mt-2 mb-4 text-left">{testimonials[currentSlide].text}</p>
              {testimonials[currentSlide].companyName && (
                <p className="text-sm text-gray-600 text-left">{testimonials[currentSlide].companyName}</p>
              )}
              <p className="text-sm text-gray-600 text-left">
                Relationship: {testimonials[currentSlide].relationship || 'Not specified'}
              </p>
            </div>

            {testimonials.length > 1 && (
              <button
                onClick={nextSlide}
                className="col-span-1 bg-gray-200 text-gray-800 rounded-full w-10 h-10 shadow hover:bg-gray-300 transition z-10 flex justify-center items-center"
              >
                <FaChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cards;
