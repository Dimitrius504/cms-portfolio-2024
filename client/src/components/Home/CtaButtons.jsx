import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionButton = ({ text, linkTo }) => {
    return (
        <Link to={linkTo}
            className="inline-flex items-center justify-center text-xl px-10 py-5 leading-none border rounded-lg text-white bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 transition-all duration-300 ease-in-out shadow-2xl my-4 mx-3 hover:-translate-y-1 transform">
            {text}
        </Link>
    );
}

export default CallToActionButton;
