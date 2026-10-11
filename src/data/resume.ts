export const RESUME = {
  name: 'M Darshan',
  title: 'Software Engineer',
  subtitle: 'AI/ML | Full Stack | Cloud',
  contact: {
    phone: '+91 9328336882',
    email: 'darshanmaharaja1@gmail.com',
    linkedin: 'https://linkedin.com/in/darshan',
    github: 'https://github.com/darsh6194',
    website: 'https://darshanmaharaja.tech',
  },
  education: {
    university: 'Visvesvaraya Technological University (VTU)',
    degree: 'Bachelor of Engineering in Computer Science with AIML',
    cgpa: '8.3 CGPA',
    duration: 'Jun 2021 – Jun 2025',
    location: 'Bangalore, Karnataka',
  },
  experience: {
    company: 'Eximietas Design',
    role: 'Software Engineer',
    duration: 'May 2025 – Present',
    location: 'Bangalore, Karnataka',
    projects: [
      {
        title: 'Enterprise CRM Platform',
        description:
          'Built a multi-channel notification engine using Node.js, TypeScript, Python, and PostgreSQL within a microservice architecture, delivering real-time alerts across Email, Microsoft Teams, WhatsApp, and SMS to 500+ enterprise users, processing 10,000+ notifications/day.',
        tech: ['Node.js', 'TypeScript', 'Python', 'PostgreSQL'],
      },
      {
        title: 'Shared Infrastructure',
        description:
          'Designed a shared timezone-management module adopted across 8+ microservices, built a reusable Redis initialization package (cutting duplicate config code by ~70%), and engineered Kafka-driven event pipelines handling 50,000+ events/day.',
        tech: ['Redis', 'Kafka', 'Microservices'],
      },
      {
        title: 'Enterprise Mail Parser Engine',
        description:
          'Built a parsing pipeline processing 1,000+ inbound emails/day that extracts structured data and attachments and automatically routes them into ticketing workflows, cutting manual triage time by ~40%.',
        tech: ['Node.js', 'TypeScript', 'PostgreSQL'],
      },
      {
        title: 'Full Stack Development & Deployment',
        description:
          'Built 5+ internal tools with React.js, Next.js, Node.js, and PostgreSQL, exposing REST/GraphQL APIs via TypeORM; Dockerized services and standardized deployment workflows, cutting deployment time by ~30%.',
        tech: ['React.js', 'Next.js', 'Docker', 'GraphQL'],
      },
      {
        title: 'Patch Management',
        description:
          'Building a patch-management module using C# and .NET 8 that detects missing or available patches across managed endpoints in both online and offline states, and deploys them via a centralized management server.',
        tech: ['C#', '.NET 8'],
      },
    ],
  },
  projects: [
    {
      title: 'ExiLead',
      tech: 'TypeScript, TypeORM, Playwright, Python, PostgreSQL, GCP',
      date: 'Aug 2025',
      bullets: [
        'Built a job-aggregation platform using Python and Playwright to scrape and deduplicate 5,000+ listings/day from 10+ sources, with scheduled pipelines orchestrated via Graphile Worker.',
        'Designed the backend with TypeORM + PostgreSQL, integrated Google OAuth for multi-user auth, and containerized the system with Docker for GCP deployment.',
      ],
    },
    {
      title: 'AutoClaw.ai',
      tech: 'React.js, Node.js, Docker SDK, Docker, GCP, Wildcard DNS',
      date: '2026',
      bullets: [
        'Built a self-service deployment platform that provisions isolated OpenClaw instances for 100+ users via Docker SDK, cutting manual setup time from hours to under 2 minutes.',
        'Designed wildcard DNS routing for zero-touch subdomain assignment and built full-stack monitoring dashboards with React.js and Node.js.',
      ],
    },
  ],
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
    Backend: [
      'Node.js',
      'FastAPI',
      'C#',
      '.NET 8',
      'REST & GraphQL',
      'TypeORM',
      'Microservices',
      'Kafka',
    ],
    Frontend: ['React.js', 'Next.js'],
    'Databases & Caching': ['PostgreSQL', 'Redis'],
    'DevOps & Cloud': [
      'Docker',
      'Docker Compose',
      'Docker SDK',
      'GitHub Actions',
      'CI/CD',
      'AWS',
      'GCP',
      'Linux',
    ],
    Other: ['OAuth/SSO', 'Playwright', 'Git', 'GitHub', 'Postman'],
  },
  achievements: [
    {
      title: 'Image Recognition Hackathon',
      detail: 'Secured 1st place for developing the model with highest accuracy',
      date: 'Jun 2024',
      location: 'Bangalore',
    },
    {
      title: 'ISRO Antarakshiya Hackathon',
      detail: 'Selected and successfully submitted a working project',
      date: 'Jan 2025',
      location: 'Bangalore',
    },
    {
      title: 'Unfold 2024 Blockchain Hackathon',
      detail: 'Selected and successfully submitted a working project',
      date: 'Dec 2024',
      location: 'Bangalore',
    },
  ],
} as const;
