import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSection from '../components/ProfileAuth/AdminSection';
import { useUser } from '../context/UserContext.js';
import HeroContents from '../components/Home/HeroContents.jsx';

const Account = () => {
  const { user, logout } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [relationship, setRelationship] = useState('Employee');
  const [testimonials, setTestimonials] = useState([]);
  const [existingTestimonial, setExistingTestimonial] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsAdmin(user?.user?.adminRequested === 'CONFIRMED');
    fetchTestimonials();
  }, [user]);

  const handleAdminRequest = async () => {
    if (!requestMessage.trim()) {
      alert('Please enter a reason for requesting admin access.');
      return;
    }
    try {
      const response = await axios.post('/api/request-admin', { userId: user?.user?.id, message: requestMessage });
      alert('Request for admin access sent!');
      setRequestMessage('');
    } catch (error) {
      console.error('Error requesting admin access:', error);
      alert('Failed to send admin request.');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`/api/testimonials/user-testimonial?userId=${user?.user?.id}`);
      if (response.headers['content-type'].includes('application/json')) {
        setTestimonials(response.data);
        if (response.data.length > 0) {
          setExistingTestimonial(response.data[0]);
          setTestimonial(response.data[0].text);
          setRelationship(response.data[0].relationship);
        }
      } else {
        console.error('Unexpected response format:', response.data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    }
  };

  const handleEditTestimonial = () => {
    if (existingTestimonial) {
      setTestimonial(existingTestimonial.text);
      setRelationship(existingTestimonial.relationship);
      setIsEditing(true);
    }
  };

  const handleTestimonialSubmit = async () => {
    if (!testimonial.trim()) {
      alert('Please enter a testimonial.');
      return;
    }

    try {
      const userId = user?.user?.id;
      const name = `${user?.user?.firstName} ${user?.user?.lastName}`;
      const companyName = user?.user?.companyInfo?.companyName;

      if (!userId) {
        alert('User ID is missing. Please log in again.');
        return;
      }

      const payload = {
        userId,
        name,
        companyName,
        relationship,
        text: testimonial,
      };

      if (existingTestimonial && isEditing) {
        await axios.put(`/api/testimonials/${existingTestimonial._id}`, payload);
        alert('Testimonial updated!');
        setIsEditing(false);
      } else {
        await axios.post('/api/testimonials', payload);
        alert('Testimonial submitted!');
      }

      setTestimonial('');
      setRelationship('Work Colleague');
      fetchTestimonials();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial.');
    }
  };

  return (
    <>
      <HeroContents
        title={`${user?.user?.firstName}'s Account`}
        subtitle="Discover more about my journey, expertise, and passions."
        bg="bg-indigo-700"
      />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 gap-6 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <AdminSection />
            {existingTestimonial && !isEditing ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Your Testimonial</h2>
                <p>{existingTestimonial.text}</p>
                <p className="text-sm text-gray-600">
                  - {existingTestimonial.name} ({existingTestimonial.relationship})
                </p>
                <button onClick={handleEditTestimonial} className="btn btn-primary mt-4">
                  Edit Testimonial
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{isEditing ? 'Edit Your Testimonial' : 'Leave a Testimonial'}</h2>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter your testimonial"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                ></textarea>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Professor">Professor</option>
                    <option value="Work Colleague">Work Colleague</option>
                    <option value="Boss">Boss</option>
                    <option value="Family Member">Family Member</option>
                    <option value="Friend">Friend</option>
                  </select>
                </div>

                <button onClick={handleTestimonialSubmit} className="btn btn-primary mt-4">
                  {isEditing ? 'Update Testimonial' : 'Submit Testimonial'}
                </button>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
            <p><strong>Email:</strong> {user?.user?.email || 'Not Provided'}</p>
            <p><strong>Phone:</strong> {user?.user?.contactInfo?.phoneNumber || 'Not Provided'}</p>
            <p><strong>Company:</strong> {user?.user?.companyInfo?.companyName || 'Not Provided'}</p>
            <p><strong>Address:</strong> {user?.user?.companyInfo?.companyAddress || 'Not Provided'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <p>{testimonial.text}</p>
                  <p className="text-sm text-gray-600">
                    - {testimonial.name || 'Unknown User'} ({testimonial.relationship})
                  </p>
                </div>
              ))
            ) : (
              <p>No testimonials available.</p>
            )}
          </div>
          <div className="text-right">
            <button onClick={logout} className="btn btn-red-500 mt-4">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
