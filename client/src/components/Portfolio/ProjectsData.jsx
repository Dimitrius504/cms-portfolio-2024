const PortfolioItems = [
  {
    id: 1,
    title: "React Project",
    description: "A project showcasing my skills in React development.",
    technologies: ["React", "Node.js", "MongoDB"],
    date: "2022-05-01",
    githubLink: "https://github.com/user/react-project",
    projectLink: "https://example.com/react-project",
  },
  {
    id: 2,
    title: "HTML/CSS Project",
    description: "A project demonstrating my proficiency in HTML and CSS.",
    technologies: ["HTML", "CSS"],
    date: "2022-05-05",
    githubLink: "https://github.com/user/html-css-project",
    projectLink: "https://example.com/html-css-project",
  },
  {
    id: 3,
    title: "Javascript Project",
    description: "A project highlighting my expertise in JavaScript.",
    technologies: ["Javascript", "Node.js"],
    date: "2022-05-10",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 4,
    title: "Bootstrap Project",
    description: "A project utilizing Bootstrap for responsive design.",
    technologies: ["Bootstrap", "HTML", "CSS"],
    date: "2022-05-09",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 5,
    title: "Tailwind CSS Project",
    description: "A project showcasing my use of Tailwind CSS for styling.",
    technologies: ["Tailwind", "React"],
    date: "2022-05-2",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 6,
    title: "Handlebars Project",
    description: "A project demonstrating my skills in Handlebars templating.",
    technologies: ["Handlebars", "Node.js"],
    date: "2022-05-10",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 7,
    title: "Angular Project",
    description:
      "A project utilizing Angular framework for frontend development.",
    technologies: ["Angular", "Node.js"],
    date: "2023-05-10",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 8,
    title: "Express Project",
    description:
      "A project built using Express framework for backend development.",
    technologies: ["Express", "Node.js"],
    date: "2023-05-29",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 9,
    title: "Node.js Project",
    description: "A project showcasing my skills in Node.js development.",
    technologies: ["Node.js"],
    date: "2024-01-10",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 10,
    title: "C# Project",
    description: "A project demonstrating my expertise in C# development.",
    technologies: ["C#", "ASP.NET"],
    date: "2024-07-10",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 11,
    title: "ASP.NET Project",
    description: "A project built using ASP.NET framework.",
    technologies: ["ASP.NET"],
    date: "2024-02-20",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 12,
    title: "SQL Database Project",
    description: "A project utilizing SQL Database for data storage.",
    technologies: ["SQL Database"],
    date: "2024-06-21",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 13,
    title: "MongoDB Project",
    description: "A project showcasing my skills in MongoDB.",
    technologies: ["MongoDB"],
    date: "2022-05-03",
    githubLink: "https://github.com/user/javascript-project",
    projectLink: "https://example.com/javascript-project",
  },
  {
    id: 14,
    title: "Adobe Photoshop Project",
    description: "A project demonstrating my skills in Adobe Photoshop.",
    technologies: ["Adobe Photoshop"],
  },
  {
    id: 15,
    title: "Adobe Illustrator Project",
    description: "A project utilizing Adobe Illustrator for graphic design.",
    technologies: ["Adobe Illustrator"],
  },
  {
    id: 16,
    title: "Figma Project",
    description: "A project showcasing my skills in Figma.",
    technologies: ["Figma"],
  },
  {
    id: 17,
    title: "Docker Project",
    description: "A project utilizing Docker for containerization.",
    technologies: ["Docker"],
  },
  {
    id: 18,
    title: "Dropbox Integration Project",
    description: "A project integrating Dropbox functionality.",
    technologies: ["Dropbox"],
  },
  {
    id: 19,
    title: "Slack Integration Project",
    description: "A project integrating Slack functionality.",
    technologies: ["Slack"],
  },
  {
    id: 20,
    title: "Github Integration Project",
    description: "A project integrating Github functionality.",
    technologies: ["Github"],
  },
];

PortfolioItems.sort((a, b) => new Date(b.date) - new Date(a.date));

export default PortfolioItems;
