import type { Content } from './content.model';
import { TECNOVA3_RESULT_URL } from './facts';

export const EN: Content = {
  meta: {
    title: 'Leandro Campelo | Mid-level Software Developer',
    description:
      'Mid-level software developer working on ERP software with Java (Spring Boot), Angular, NestJS and microservices. Projects, experience and resume.',
  },
  skipLink: 'Skip to content',
  newTab: '(opens in a new tab)',
  nav: {
    label: 'Sections',
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  langSwitch: { label: 'Language' },
  theme: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  present: 'Present',
  inProgress: 'in progress',

  hero: {
    role: 'Mid-level Software Developer',
    location: 'Teresina, Brazil',
    intro:
      'I build modules for the wCompany 3G ERP at NextCompany with Java (Spring Boot) and Angular. My work covers Brazilian tax rules, data migrations, and integrations; before that, I built Flutter apps for healthcare and inclusion.',
    ctaProjects: 'See projects',
    ctaCv: 'Download resume (English)',
    cvOther: 'Resume in Portuguese (PDF)',
  },

  about: {
    title: 'About',
    record: {
      label: 'Profile summary',
      role: 'Role',
      company: 'Company',
      companyNote: 'ERP for several industries',
      since: 'Since',
      project: 'Current project',
      stack: 'Project stack',
      base: 'Based in',
      education: 'Education',
      educationValue: 'Associate degree in Systems Analysis; AI postgrad in progress',
    },
    paragraphs: [
      'NextCompany serves very different businesses, so the work covers a wide range of rules: Brazilian electronic invoices (NF-e and NFC-e), tax calculation and SPED reporting, banking and cash management, field sales, and even parenteral nutrition bag compounding.',
      'Besides the ERP modules, I delivered the customer portal for invoice payments with the Iugu API, which now handles 100% of those payments, and migrated databases for 10+ customers involving Firebird and Oracle.',
      'Two of my projects were healthcare and inclusion apps: Appraxi, validated with speech therapists, and Expressa+, validated with psychologists. I am currently pursuing a postgraduate degree in Artificial Intelligence.',
    ],
  },

  experience: {
    title: 'Experience',
    cta: 'See projects',
    items: {
      nextcompany: {
        title: 'Mid-level Software Developer',
        bullets: [
          'wCompany 3G: 3 modules delivered in Java (Spring Boot) and Angular on a microservices architecture.',
          'Brazilian tax features: co-maintaining the NF-e and NFC-e electronic invoicing modules (including tax calculation rules) and supporting statutory reporting (SPED).',
          'Database migrations for 10+ customers involving Firebird (multiple versions) and Oracle (18 and 21); each customer runs its own database on a dedicated server.',
          'Customer portal for invoice payments, integrated with the Iugu API: it handles 100% of payments, whether created by the finance team or by customers.',
          "wCRM, the company's cloud CRM: NestJS backend with SOLID and Clean Architecture, Kafka, Redis and Docker; React and TypeScript frontend; PostgreSQL reports (Prisma ORM) and tax data in MongoDB.",
          '20-person team (5 developers) using Scrum and Kanban; Docker and Kubernetes in company environments and Qlik for data analysis.',
        ],
      },
      comunicare: {
        title: 'Mobile and Backend Developer',
        bullets: ['Built Appraxi: Flutter app, Python backend, and Kaldi speech recognition.'],
      },
    },
  },

  projects: {
    title: 'Projects',
    intro: 'What each project solves and what I did on it.',
    stackLabel: 'Tech',
    items: {
      wcompany: {
        org: 'NextCompany',
        role: 'Developer',
        status: 'Ongoing',
        summary:
          "The next generation of NextCompany's ERP, built on microservices: each business routine runs as an independent service.",
        bullets: [
          'I have delivered 3 modules so far, with Java (Spring Boot) on the backend and Angular on the frontend.',
          'The system covers banking, sales, purchasing, cash management, freight, field sales, and parenteral nutrition bag compounding.',
        ],
        privateCode: 'Proprietary code, no public repository',
        note: {
          text: 'Selected for the TECNOVA 3 Piauí innovation grant program (FAPEPI/MCTI/FINEP).',
          label: 'See the official list (in Portuguese)',
          href: TECNOVA3_RESULT_URL,
        },
      },
      appraxi: {
        org: 'Comunicare Solutions',
        role: 'Mobile and Backend Developer',
        summary:
          'An app that supports therapy for people with speech apraxia, an acquired neurological disorder that affects speech production.',
        bullets: [
          'Developed the cross-platform Flutter app (about 8 screens), validated by 2 speech therapists.',
          'Implemented the Python backend and integrated Kaldi speech recognition, generating spectrograms for voice analysis.',
        ],
        note: {
          text: 'After my time at the company, Appraxi was selected for TECNOVA 3 Piauí.',
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
          'Led the Flutter development in a 5-person team, organizing the backlog and deliveries with Agile practices.',
          "Validated the app's usability and therapeutic fit with psychologists.",
        ],
        linkLabel: 'Code on GitHub',
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
    title: "Let's talk",
    text: 'The quickest way to reach me is LinkedIn or email.',
    email: 'Email',
    cvTitle: 'Resume (PDF)',
    cvLangs: { 'pt-BR': 'Portuguese', en: 'English' },
    cvDownload: 'Download',
    cvView: 'View',
  },

  footer: {
    source: 'This site and the resume PDFs are built from the same repository.',
    sourceLink: 'View source',
  },
};
