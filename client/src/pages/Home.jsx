import React from 'react';
import HeroContents from '../components/Home/HeroContents';
import Cards from '../components/Home/Cards';
import CallToActionButton from '../components/Home/CtaButtons';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <HeroContents title='Dimitrius McKinnon' subtitle='Welcome To My Full Stack Portfolio' bg='bg-indigo-700' />
      <section className='flex justify-evenly text-center p-6'>
        <div className="flex flex-wrap flex-col justify-center text-center">
          <a href="https://github.com/Dimitrius504"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-500 transition-colors duration-300">
            <FaGithub className="text-6xl" />
          </a>
        </div>

        <div className="flex flex-wrap justify-evenly items-center">
          <CallToActionButton text="Download My Resume" linkTo="/resume" />
        </div>
        <div className="flex flex-wrap flex-col justify-center text-center">
          <a href="https://www.linkedin.com/in/dimitriusmckinnon/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-500 transition-colors duration-300">
            <FaLinkedin className="text-6xl" />
          </a>
        </div>

      </section>
      <Cards />

    </div>
  )
}

export default Home;
