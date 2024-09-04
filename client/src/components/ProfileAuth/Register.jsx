import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        nickname: '',
        password: '',
        image: null
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('/api/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                navigate('/signin');
            } else if (response.status === 400) {
                setError('Invalid data. Please check your form.');
            }
            else {
                throw new Error('Failed to register.');
            }
        } catch (error) {
            setError('Invalid data. Please check your form.');
            console.error('Error posting form:', error);
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
                    <div className="space-y-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" name="firstName" id="firstName" autoComplete="given-name"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" name="lastName" id="lastName" autoComplete="family-name"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" autoComplete="email"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
                        <input type="text" name="nickname" id="nickname" autoComplete="nickname"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" autoComplete="new-password"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input type="text" name="companyName" id="companyName"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
                        <input type="text" name="companyAddress" id="companyAddress"
                            required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange} />
                    </div>

                    {/* <div className="space-y-1">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" name="image" id="image"
                            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={handleChange} />
                    </div> */}
                    {error && (
                        <div className="text-red-500 text-center mb-2">{error}</div>
                    )}

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Register
                    </button>
                </form>
                <div className="mt-3 text-center">
                    Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-700">Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
