import React from 'react';
import HeroContents from '../components/Home/HeroContents';
import { IoIosDownload } from "react-icons/io";
// import resume from '../../../uploads/dimitrius_mckinnon_resume.pdf';

const Resume = () => {
  return (
    <>
      <HeroContents title='Resume' subtitle='Discover some of my technical skills & experiences' bg='bg-indigo-700' />

      <div className="bg-white p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center items-center mt-4 mb-4">
            <a
              href="https://github.com/Dimitrius504/dimitrius_mckinnon_resume/blob/main/dimitrius_mckinnon_resume.pdf"
              download="Dimitrius_McKinnon_Resume.pdf"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg md:text-base md:px-6 md:py-3 md:rounded-md md:shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
            >
              Download Resume
              <IoIosDownload />
            </a>
          </div>
          <div className='hidden md:block'>

            <header className="text-center">
              <h1 className="text-3xl font-bold">Dimitrius McKinnon</h1>
              <p>Student | Full-Stack Developer | Design</p>
              <div className="flex justify-center space-x-4 my-4">
                <a href="https://www.linkedin.com/in/dimitriusmckinnon" className="text-blue-500">LinkedIn</a>
                <span>dimitriusmckinnon419@gmail.com</span>
                <span>(705) 321-9729</span>
              </div>
            </header>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">Objective</h2>
              <p>To leverage and expand my skills from both academics and personal pursuits in a technical role, where I can contribute value to your business while continuously growing my expertise.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">Personal Traits</h2>
              <ul className='grid grid-cols-3 gap-4'>
                <li>Leadership & Management Skills</li>
                <li>Adaptable Personality</li>
                <li>Observational</li>
                <li>Problem-Solving</li>
                <li>Strong Work Ethic</li>
                <li>Detail-Oriented</li>
                <li>Team Player</li>

              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">Technical Skills</h2>
              <div className="grid grid-cols-3 gap-4">
                <span>React</span>
                <span>PHP</span>
                <span>ASP.Net</span>
                <span>MySQL Workbench</span>
                <span>HTML & CSS</span>
                <span>Adobe Photoshop</span>
                <span>Adobe Illustrator</span>
                <span>Node / Express</span>
                <span>JavaScript</span>
                <span>Git / Github</span>
                <span>SQL / NoSQL Database</span>
                <span>Responsive Design</span>

              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">Work Experience</h2>
              <div>
                <h3 className="font-bold">Jr. Full-Stack Developer | Canadian Cutters (2024-Present)</h3>
                <p>At Canadian Cutters, my family's local business, I develop responsive web applications, mainly using JavaScript frameworks and customizing Shopify themes. My role also involves enhancing SEO, writing content, and managing product data to increase site traffic. I aim to significantly improve user experience with tailored, functional solutions that meet client needs. This work has sharpened my technical skills and deepened my understanding of client-focused software development.</p>
                <h3 className="font-bold">Server | Kelsey’s (2022-Present)</h3>
                <p>Demonstrated outstanding interpersonal and sales skills, consistently delivering high-quality service. Skilled in accurately understanding and meeting customer preferences, ensuring precise order fulfillment. Dedicated to creating a welcoming environment and cultivating enduring relationships with patrons.</p>

              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">Education</h2>
              <p className='font-bold'>Georgian College | Barrie (2022-2024)</p>
              <p className='font-bold'>Interactive Media Design & Web</p>

              <p>Graduated from Georgian College with a focus in Interactive Media Design & Web in 2024. Developed expertise in both client-side and server-side
                frameworks, mastering essential concepts such as separation of concerns, version control, and SEO. Gained practical skills in various design platforms, learning to work effectively within teams and meet strict deadlines, ensuring high-quality web
                performance and user engagement.</p>
            </section>

          </div>
        </div>
      </div>

    </>

  );
}

export default Resume;
