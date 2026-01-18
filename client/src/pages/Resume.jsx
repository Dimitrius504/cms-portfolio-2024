import React from "react";
import HeroContents from "../components/Home/HeroContents";
import { Helmet } from "react-helmet-async";

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Resume - Dimitrius McKinnon</title>
        <meta
          name="description"
          content="Resume for Dimitrius McKinnon - Solutions & Operations Specialist."
        />
        <link rel="canonical" href="/resume" />
      </Helmet>

      <HeroContents
        title="Resume"
        subtitle="Solutions & Operations Specialist"
        bg="bg-indigo-700"
      />

      <div className="bg-white p-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold">Dimitrius McKinnon</h1>
            <p className="mt-1">Solutions &amp; Operations Specialist</p>

            <div className="flex flex-col md:flex-row justify-center md:space-x-4 my-4 gap-2 md:gap-0">
              <span>dimitriusmckinnon419@gmail.com</span>
              <span>(705) 321 - 9729</span>
              <a
                href="https://www.linkedin.com/in/dimitriusmckinnon"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/dimitriusmckinnon
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">
              Summary
            </h2>
            <p className="mt-3">
              I’m great at keeping customers informed and secure while driving issues to a clear outcome. I stay organized,
              calm under pressure, and I’m quick to spot what isn’t working - then tighten the process so it doesn’t persist. I
              pick up new tools fast and I’m always sharpening my skill set
            </p>
          </section>

          {/* Skills */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">
              Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              <span>Client Communication</span>
              <span>Issue Resolution</span>
              <span>Customer Experience &amp; Upselling</span>
              <span>Project &amp; Operations Management</span>
              <span>Technical Problem-Solving</span>
              <span>Process Improvement</span>
              <span>Reporting &amp; Data Cleanup</span>
              <span>CRM</span>
            </div>
          </section>

          {/* Experience */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">
              Experience
            </h2>

            {/* Jayne's */}
            <div className="mt-4">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <div>
                  <h3 className="font-bold">Jayne’s Luxury Rentals</h3>
                  <p>Digital Solutions &amp; Operations Coordinator</p>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  <p>Port Carling, ON</p>
                  <p>(Jan 2025 - Present)</p>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Built and maintain a centralized operations dataset (“mega
                  spreadsheet”/dashboard) that unifies property, reservation,
                  and customer information, reducing manual lookups across
                  teams.
                </li>
                <li>
                  Automated and streamlined intake/updates between systems
                  (CRM/PMS + spreadsheets), improving data consistency and
                  cutting repetitive admin work.
                </li>
                <li>
                  Coordinated daily driver scheduling and logistics, serving as
                  the main point of contact for route changes, timing issues,
                  and operational troubleshooting.
                </li>
                <li>
                  Supported guests, owners, and inquirers by phone/email with
                  billing, reservations, and issue resolution, ensuring accurate
                  information, clear next steps, and timely follow-up.
                </li>
                <li>
                  Partnered cross-functionally (reservations, operations,
                  finance, field staff) to identify workflow gaps and implement
                  practical fixes that improved reliability and turnaround time.
                </li>
              </ul>
            </div>

            {/* Canadian Cutters */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <div>
                  <h3 className="font-bold">Canadian Cutters</h3>
                  <p>Full Stack Developer &amp; SEO Specialist</p>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  <p>Orillia, ON</p>
                  <p>(Apr 2024 - Present)</p>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Led the transition from a custom-built website to Shopify,
                  improving maintainability and streamlining order management.
                </li>
                <li>
                  Customized Shopify themes using Liquid and front-end styling
                  to improve user experience and site performance.
                </li>
                <li>
                  Implemented SEO improvements (site structure, metadata,
                  content optimization) to increase search visibility and inbound
                  traffic.
                </li>
                <li>
                  Used analytics and customer behavior insights to inform
                  marketing and product decisions, improving discoverability and
                  conversion performance.
                </li>
                <li>
                  Provided technical guidance to support business growth,
                  advising on platform setup, content strategy, and ongoing site
                  improvements.
                </li>
              </ul>
            </div>

            {/* Kelsey's */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <div>
                  <h3 className="font-bold">Kelsey’s Roadhouse</h3>
                  <p>Server / Bartender</p>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  <p>Orillia, ON</p>
                  <p>(Apr 2022 - Present)</p>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Deliver high-volume service in a fast-paced environment while
                  maintaining a strong guest experience and repeat business.
                </li>
                <li>
                  Increase check totals through consistent upselling, menu
                  knowledge, and tailored recommendations.
                </li>
                <li>
                  Resolve guest concerns quickly and professionally, using
                  active listening and de-escalation to protect brand
                  reputation.
                </li>
                <li>
                  Collaborated with kitchen and bar teams to prioritize timing,
                  accuracy, and quality under pressure.
                </li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold border-b-2 border-gray-300 py-2">
              Education
            </h2>

            <div className="mt-4">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <div>
                  <h3 className="font-bold">Georgian College</h3>
                  <p>Interactive Media Design - Web (Co-op)</p>
                </div>
                <div className="text-sm text-gray-600 md:text-right">
                  <p>Barrie, ON</p>
                  <p>(Sept 2022 - Aug 2024)</p>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Graduated with honours; earned Dean’s List recognition every
                  semester, demonstrating consistent academic excellence and
                  strong performance under demanding project deadlines.
                </li>
                <li>
                  Collaborated with peers and faculty on cross-disciplinary
                  projects, strengthening communication, presentation, and
                  client-focused solution design skills.
                </li>
                <li>
                  Led the SmartBeach project, coordinating a six-member team to
                  design and deliver a full-stack web application integrating
                  real-time weather and safety data.
                </li>
                <li>
                  Built strong foundations in web development, user experience,
                  e-commerce platforms, AI applications, and business
                  innovation—bridging technical solutions with business
                  outcomes.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Resume;
