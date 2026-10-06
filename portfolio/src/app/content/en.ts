import type { Content } from './content.model';
import { TECNOVA3_RESULT_URL } from './facts';

export const EN: Content = {
  meta: {
    title: 'Leandro Campelo · Mid-level Software Developer',
    description:
      'Mid-level software developer working on ERP software with Java (Spring Boot), Angular, NestJS and microservices. Projects, experience and resume.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Sections',
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
  },
  langSwitch: { label: 'Language' },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  present: 'Present',
  inProgress: 'in progress',

  hero: {
    role: 'Mid-level Software Developer',
    location: 'Teresina, Brazil',
    paragraphs: [
      "I work at NextCompany, an ERP vendor serving businesses across several industries. I currently build modules for wCompany 3G, the next generation of the company's ERP, using Java (Spring Boot), Angular and a microservices architecture.",
      'Because the ERP serves very different businesses, the work covers a wide range of business rules: Brazilian electronic invoices (NF-e and NFC-e), tax calculation and SPED reporting, banking and cash management, field sales, and even parenteral nutrition bag compounding.',
      'Before that, I built Flutter apps for healthcare and inclusion. I am currently pursuing a postgraduate degree in Artificial Intelligence.',
    ],
    cvPrimary: 'Resume in English',
    cvSecondary: 'Resume in Portuguese',
    pdf: 'PDF',
  },

  projects: {
    title: 'Projects',
    intro: 'The context behind each project and what I did on it, in more detail than a resume allows.',
    stackLabel: 'Tech',
    items: {
      wcompany: {
        role: 'NextCompany · Developer',
        status: 'Ongoing',
        summary:
          "The next generation of NextCompany's ERP, built on microservices: each business routine runs as an independent service.",
        bullets: [
          'I build modules with Java (Spring Boot) on the backend and Angular on the frontend: banking, sales, purchasing, cash management, freight, field sales, and parenteral nutrition bag compounding.',
          'Proprietary code, so there is no public repository.',
        ],
        note: {
          text: 'The project was selected for the TECNOVA 3 Piauí innovation grant program (FAPEPI/MCTI/FINEP).',
          label: 'See the official list (in Portuguese)',
          href: TECNOVA3_RESULT_URL,
        },
      },
      appraxi: {
        role: 'Comunicare Solutions · Mobile and Backend Developer',
        summary:
          'An app that supports therapy for people with speech apraxia, an acquired neurological disorder that affects speech production.',
        bullets: [
          'Developed the cross-platform Flutter app with attention to accessibility and usability, and validated its features with healthcare professionals.',
          "Implemented Python backend services for the app's data integration and processing.",
          'Integrated Kaldi speech recognition models on Linux (Ubuntu) and generated spectrograms to support voice analysis with speech therapists.',
        ],
        note: {
          text: 'After my time at the company, Appraxi was selected for the TECNOVA 3 Piauí innovation grant program (FAPEPI/MCTI/FINEP).',
          label: 'See the official list (in Portuguese)',
          href: TECNOVA3_RESULT_URL,
        },
        linkLabel: 'Appraxi website',
      },
      expressa: {
        role: 'Mobile Developer and Technical Lead',
        summary:
          'An Android app for including children with special needs, with interactions designed for autistic children.',
        bullets: [
          "Led the Flutter development and organized the team's backlog, tasks, and deliveries using Agile practices.",
          "Validated the app's usability and therapeutic fit with psychologists.",
        ],
        linkLabel: 'Code on GitHub',
      },
    },
  },

  experience: {
    title: 'Experience',
    items: {
      nextcompany: {
        title: 'Mid-level Software Developer',
        bullets: [
          'wCompany 3G: modules in Java (Spring Boot) and Angular on a microservices architecture.',
          "The ERP's Brazilian tax features: electronic invoices (NF-e and NFC-e), tax calculation rules, and statutory reporting (SPED).",
          'Data migrations involving Firebird (multiple versions) and Oracle (18 and 21) databases.',
          "wCRM, the company's cloud CRM: NestJS backend with SOLID and Clean Architecture, Kafka, Redis and Docker; React and TypeScript frontend; PostgreSQL reports (Prisma ORM) and tax data in MongoDB.",
          "Docker and Kubernetes in the company's environments, Qlik for data analysis, and Agile teams using Scrum and Kanban.",
        ],
      },
      comunicare: {
        title: 'Mobile and Backend Developer',
        bullets: ['Built Appraxi: Flutter app, Python backend, and Kaldi speech recognition.'],
      },
    },
  },

  skills: {
    title: 'Skills',
    groups: {
      backend: 'Backend',
      frontend: 'Frontend & mobile',
      data: 'Databases & BI',
      architecture: 'Architecture & integration',
      auth: 'Authentication',
      devops: 'DevOps & observability',
      testing: 'Testing & methodologies',
      ai: 'AI',
    },
    terms: {},
    languagesTitle: 'Languages',
    languages: ['Portuguese (native)', 'English (advanced)', 'Spanish (intermediate)'],
  },

  education: {
    title: 'Education',
    items: {
      postgrad: {
        course: 'Postgraduate Program in Artificial Intelligence',
        detail:
          'Machine Learning and Deep Learning research comparing regression, decision trees, neural networks, and Transformers.',
      },
      ads: {
        course: 'Associate Degree in Systems Analysis and Development',
      },
      ifpi: {
        course: 'Technical Degree in Information Technology',
      },
    },
    coursesTitle: 'Courses',
    courses: [
      'Mobile Development with Flutter (Alura)',
      'Backend Architecture with NestJS (Alura)',
      'Java and Spring Boot for REST APIs (Alura)',
    ],
  },

  contact: {
    title: 'Contact',
    text: 'The quickest way to reach me is by email or LinkedIn.',
    email: 'Email',
  },

  footer: {
    source: 'This site and the resume PDFs are built from the same repository.',
    sourceLink: 'View source',
  },
};
