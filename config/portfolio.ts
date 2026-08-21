export const portfolioData = {
  name: "canonflow.exe",
  title: "Software Engineer - Backend",
  email: "dev.nathangarzyasantoso@gmail.com",
  github: "https://github.com/canonflow",
  linkedin: "https://linkedin.com/in/nathan-garzya-santoso-3209bb212",
  resume: "/resume.pdf",

  about: `
  Hi There, I'm Nathan Garzya Santoso, a Software Engineer with a strong interest in Backend Engineering, Distributed Systems, and Scalable Architecture.\n
  I enjoy designing and building backend systems that are reliable, efficient, and capable of handling growing workloads. My interests include distributed systems, system design, event-driven architecture, database optimization, and building scalable APIs and services.
  I'm continuously exploring system design concepts and modern backend architectures to deepen my understanding of how reliable and scalable systems are built.\n

  Currently, I'm focused on growing as a Backend Engineer with a long-term interest in designing distributed and scalable systems that solve real-world problems.
  `,

  programmingLanguages: ["Go", "PHP", "Typescript", "Python", "C#", "Kotlin"],
  backends: ["Gin", "Fiber", "Laravel", "Express", "FastAPI"],
  databases: ["MySQL", "PostgreSQL", "MariaDB"],
  infra: ["AWS", "DigitalOcean", "Docker", "Nginx"],
  versionControl: ["Github", "Bit Bucket"],
  tools: ["Insomnia", "Notion", "Jira", "Confluence"],

  projects: [
    {
      name: "Backend Starter - Modular Monolith",
      description:
        "Golang backend template using with clean layered architecture, built on Fiber V3, Gorm, Redis, and Sonic for JSON Encoder-Decoder.",
      tech: ["Golang", "Fiber", "Redis", "MySQL"],
      link: "https://github.com/canonflow/backend-starter",
    },
    {
      name: "Backend Starter - Hexagonal Architecture with Domain-Driven Design",
      description:
        "Golang backend template using Hexagonal Architecture, Domain-driven Design, and Kafka messaging integration",
      tech: ["Golang", "Gin", "MySQL", "Kafka", "Docker", "Redis"],
      link: "https://github.com/canonflow/canonflow-go-ddd",
    },
    {
      name: "Saga Pattern Simulation",
      description:
        "Simulation of the Saga pattern for managing distributed transactions across microservices, demonstrating both orchestration and choreography approaches with compensating actions to maintain data consistency.",
      tech: ["Golang", "Kafka", "Design Pattern"],
      link: "https://github.com/canonflow/canonflow-go-ddd",
    },
    {
      name: "Golang Backend Template",
      description: "Golang backend template with layered architecture design",
      tech: ["Golang", "Gin", "MySQL"],
      link: "https://github.com/canonflow/canonflow-go-backend-template",
    },
    {
      name: "Gojudge",
      description:
        "Golang package for competitive programming compiler service",
      tech: ["Golang"],
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
      role: "Software Engineer, Backend",
      company: "Philip Morris International",
      period: "Jun 2025 - Present",
      description:
        "Building AYO B2B Ecosystems for KSA (Kingdom of Saudi Arabia) and ID (Indonesia)",
    },
    {
      role: "Software Engineer Intern",
      company: "Philip Morris International",
      period: "Dec 2025 - May 26",
      description:
        "Contributed to the development and maintenance of AYO B2B Ecosystems",
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
