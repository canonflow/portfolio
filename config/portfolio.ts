export const portfolioData = {
  name: "canonflow.exe",
  title: "Software Engineer - Backend",
  email: "dev.nathangarzyasantoso@gmail.com",
  github: "https://github.com/canonflow",
  linkedin: "https://linkedin.com/in/nathan-garzya-santoso-3209bb212",
  resume: "/resume.pdf",

  about: `
  Hi There, I'm Nathan Garzya Santoso, an ordinary Software Engineer with a strong interest in Backend Development and Software Engineering. Passionated about building scalable, efficient, and reliable server-side systems, including APIs, Databases, and Backend Architectures.\n
  Experienced in web development with focus on backend technologies, system integration, and data management. Continuously learning modern backend framework, system design, and best practice to grow as a backend engineer and contribute to impactful, real-world projects.
  `,

  programmingLanguages: ["Go", "PHP", "Typescript", "Python", "C#", "Kotlin"],
  backends: ["Gin", "Fiber", "Laravel", "Express", "FastAPI"],
  databases: ["MySQL", "PostgreSQL", "MariaDB"],
  infra: ["AWS", "DigitalOcean", "Docker", "Nginx"],
  versionControl: ["Github", "Bit Bucket"],
  tools: ["Insomnia", "Notion", "Jira", "Confluence"],

  projects: [
    {
      name: "Golang Clean Architecture",
      description:
        "Golang backend template using Hexagonal Architecture, Domain-driven Design, and Kafka messaging integration",
      tech: ["Go", "Gin", "MySQL", "Kafka", "Docker"],
      link: "https://github.com/canonflow/canonflow-go-ddd",
    },
    {
      name: "Golang Backend Template",
      description: "Golang backend template with layered architecture design",
      tech: ["Go", "Gin", "MySQL"],
      link: "https://github.com/canonflow/canonflow-go-backend-template",
    },
    {
      name: "Gojudge",
      description:
        "Golang package for competitive programming compiler service",
      tech: ["Go"],
      link: "https://github.com/canonflow/gojudge",
    },
    {
      name: "Golang Midtrans Service",
      description: "Midtrans payment gateway integration project",
      tech: ["Golang", "Midtrans", "Github Actions"],
      link: "https://github.com/canonflow/golang-midtrans-service",
    },
  ],

  experience: [
    {
      role: "Software Engineer Intern",
      company: "Philip Morris International",
      period: "Dec 2025 - Present",
      description:
        "Contributed to the development and maintenance of AYO Ecosystems",
    },
    {
      role: "Software Engineer Intern",
      company: "PT Salam Pacific Indonesia Lines",
      period: "Aug 2025 - Dec 2025",
      description: "Built and maintained multiple web-based softwares",
    },
  ],

  education: [
    {
      degree: "Bachelor of Computing",
      school: "University of Surabaya",
      year: "2026",
    },
  ],
};
