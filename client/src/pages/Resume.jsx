import React from 'react';
import HeroContents from '../components/Home/HeroContents';
import { IoIosDownload } from "react-icons/io";

const Resume = () => {
  return (
    <>
      <HeroContents title='Resume' subtitle='Discover some of my technical skills & experiences' bg='bg-indigo-700' />

      <div className="bg-white p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center items-center mt-4 mb-4">
            <a
              href="https://myportfoliobucket2024.s3.us-east-2.amazonaws.com/dimitrius_mckinnon_resume.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLWVhc3QtMiJGMEQCIGU3%2FbZ8Dsc%2Fbpxkj%2BlVrcuFTYsB7nFkTD8SojGV%2BddRAiAC0ex2g9IpYQCdRWCJTVi9%2BZpZZucyMw%2BpY%2BdKxf0aDCrtAgia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDczMDMzNTIyNzcxOCIM7pigC9t8aMd8U0xYKsECrMGYBidIMcEYqB2hjLHHX9zbc5zeIBO2Ap0Yv2fPyAuIOoa808q7sYnRvPWSjMq1oxcRL6JZZTxejSZNKrjAlU02EAfInugxKMKVfFxZGOoEcPQZMfboyONWWv2yVDPTABlFO1cfic7cg3MYUEqR5to5xXTOMzl51E80pM%2F%2F%2F4z%2FQ78Q2lHAKJcMDXOwCKUdcYDHAhYypWLdEsSAspjenHX2JgUd1SsrbIUzTNpzLus%2BCrSuCxyhEt65DDcIGVUfNWRvd%2BZxAK8U1UM8urLghdUmHjGbreJkjOlY3F0JMvj6BCSifagB21uH49pzObe6jjW6TNyk3zFpzTXD6lfKLAzhjEV6QIHF4IlRzWjP1BIHw%2BXKIbcnBByq8C9A0fhKQf9DZmY6MDcq%2BPyDvbYMd%2B6r1IV914rTFoeMOUtXT1OSMIH5iLcGOrQCy85hm5DGXZAIqwct%2FshPtSWwCwN7szgKEs6RU3jUiY7Dt1Qu99LFxKmiZulcFhhA6bg5gGi%2F8WbhVyRhaTLAG83Wt2%2BeghFSWvukZwv2YkphpwTRQJaNvW3Y8soM0tVFZ2CZL0HttY%2FclS2pKm22%2Fx9B5os8wY9WAlG2C%2B1UFhAR76lt8I%2FeyLfhFSOeMLwvYESGq2nqc0qc%2Fh%2FHw2MDdDFspF4vdNYYRzsrHwPxQQszYcFfAKtrjUbAvCkxEX5eYgbwrt%2Fqp%2B1rhbWdHfSV4gcT9BK29V88qJUx7CnQu9EMPxdmqtSHkx%2BsIRVabXklkSk39SlP8QyeNKrj8lfB6HATzDM12PGOQWBHJn46U%2BH9TLZdwB6ke667GFxNPu7OFCSH6%2FS%2B%2BEyyGL8p6EYzQ4fOHFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240912T011055Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2UC27F5DAW7WOT2G%2F20240912%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=b45b4450ab8b6a072c2ecfd4816b11f9105206ccfa2b819bf1ab6b227362b458"
              download
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
