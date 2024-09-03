import React from 'react';
import HeroContents from '../components/Home/HeroContents';
import Cards from '../components/Home/Cards';
import CallToActionButton from '../components/Home/CtaButtons';

const Home = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <HeroContents title='Dimitrius McKinnon' subtitle='Welcome To My Full Stack Portfolio' bg='bg-indigo-700' />
      <section className='text-center p-6'>
        <div className="flex flex-wrap justify-evenly items-center">
          <CallToActionButton text="Download My Resume" linkTo="/resume" />
        </div>
      </section>
      <Cards />

    </div>
  )
}

export default Home;
