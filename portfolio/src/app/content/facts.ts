/**
 * Fatos que não dependem de idioma: datas, links, empresas e tecnologias.
 * O texto em cada idioma fica em pt-br.ts e en.ts e referencia estes ids.
 *
 * Mantenha estes dados alinhados com o currículo em LaTeX (pt-br/ e en/).
 */

export const PROFILE = {
  name: 'Leandro Victtorio Costa Campelo',
  shortName: 'Leandro Campelo',
  email: 'leandrovicttorio78@gmail.com',
  linkedin: 'https://www.linkedin.com/in/leandro-campelo/',
  github: 'https://github.com/leandroV201',
  repository: 'https://github.com/leandroV201/resume-latex',
} as const;

/** Caminhos relativos ao base href; os PDFs são gerados pelo build do LaTeX. */
export const CV_FILES = {
  'pt-BR': 'cv/leandro-cv-pt-br.pdf',
  en: 'cv/leandro-cv-en.pdf',
} as const;

/** Lista oficial de aprovados no TECNOVA 3 Piauí (Chamada FAPEPI/MCTI/FINEP nº 01/2024). */
export const TECNOVA3_RESULT_URL =
  'https://www.fapepi.pi.gov.br/wp-content/uploads/2025/05/Lista-Final-dos-Projetos_empresas-Aprovados-Tecnova-3-3.pdf';

/** Ano e mês (1–12). `null` em `end` significa "atual". */
export interface YearMonth {
  year: number;
  month: number;
}

export interface Period {
  start: YearMonth;
  end: YearMonth | null;
}

export const PROJECT_IDS = ['wcompany', 'appraxi', 'expressa'] as const;
export type ProjectId = (typeof PROJECT_IDS)[number];

export interface ProjectFacts {
  id: ProjectId;
  name: string;
  /** Ausente quando não há data confirmada para o recorte do projeto. */
  period?: Period;
  stack: readonly string[];
  url?: string;
}

export const PROJECTS: readonly ProjectFacts[] = [
  {
    id: 'wcompany',
    name: 'wCompany 3G',
    stack: ['Java', 'Spring Boot', 'Angular'],
  },
  {
    id: 'appraxi',
    name: 'Appraxi',
    period: { start: { year: 2021, month: 1 }, end: { year: 2022, month: 2 } },
    stack: ['Flutter', 'Python', 'Kaldi', 'Linux'],
    url: 'https://comunicaresolutions.com/',
  },
  {
    id: 'expressa',
    name: 'Expressa+',
    period: { start: { year: 2024, month: 5 }, end: { year: 2025, month: 1 } },
    stack: ['Flutter', 'Android'],
    url: 'https://github.com/leandroV201/ExpressaMais',
  },
];

export const EXPERIENCE_IDS = ['nextcompany', 'comunicare'] as const;
export type ExperienceId = (typeof EXPERIENCE_IDS)[number];

export interface ExperienceFacts {
  id: ExperienceId;
  company: string;
  location: string;
  period: Period;
}

export const EXPERIENCE: readonly ExperienceFacts[] = [
  {
    id: 'nextcompany',
    company: 'NextCompany',
    location: 'Teresina, PI',
    period: { start: { year: 2025, month: 1 }, end: null },
  },
  {
    id: 'comunicare',
    company: 'Comunicare Solutions',
    location: 'Teresina, PI',
    period: { start: { year: 2021, month: 1 }, end: { year: 2022, month: 2 } },
  },
];

export const EDUCATION_IDS = ['postgrad', 'ads', 'ifpi'] as const;
export type EducationId = (typeof EDUCATION_IDS)[number];

export interface EducationFacts {
  id: EducationId;
  institution: string;
  period: Period;
  /** Curso ainda não concluído. */
  inProgress?: boolean;
}

export const EDUCATION: readonly EducationFacts[] = [
  {
    id: 'postgrad',
    institution: 'Centro Universitário Maurício de Nassau (UNINASSAU)',
    period: { start: { year: 2025, month: 6 }, end: null },
    inProgress: true,
  },
  {
    id: 'ads',
    institution: 'Centro Universitário Maurício de Nassau (UNINASSAU)',
    period: { start: { year: 2023, month: 1 }, end: { year: 2025, month: 1 } },
  },
  {
    id: 'ifpi',
    institution: 'Instituto Federal do Piauí (IFPI)',
    period: { start: { year: 2020, month: 1 }, end: { year: 2022, month: 12 } },
  },
];

export const SKILL_GROUP_IDS = [
  'backend',
  'frontend',
  'data',
  'architecture',
  'auth',
  'devops',
  'testing',
  'ai',
] as const;
export type SkillGroupId = (typeof SKILL_GROUP_IDS)[number];

/**
 * Nomes de tecnologia não se traduzem. Conceitos ("Microservices") são
 * adaptados por idioma via `terms` em cada arquivo de conteúdo.
 */
export const SKILLS: Readonly<Record<SkillGroupId, readonly string[]>> = {
  backend: ['Java (Spring Boot)', 'NestJS', 'Node.js', 'Python', 'PHP'],
  frontend: [
    'Angular',
    'React',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'shadcn/ui',
    'PrimeNG',
    'PrimeFlex',
    'Flutter',
    'React Native',
  ],
  data: ['PostgreSQL', 'Oracle', 'Firebird', 'MySQL', 'MongoDB', 'Prisma ORM', 'Qlik'],
  architecture: [
    'Microservices',
    'REST APIs',
    'WebSockets',
    'SOLID',
    'Clean Architecture',
    'Monorepo',
    'Kafka',
    'RabbitMQ',
    'Redis',
  ],
  auth: ['Keycloak (SSO)', 'Ory Kratos/Hydra', 'SuperTokens', 'JWT', 'OAuth2'],
  devops: [
    'Docker',
    'Docker Compose',
    'Kubernetes',
    'CI/CD',
    'Git',
    'Linux',
    'Firebase',
    'Supabase',
    'MinIO (S3)',
    'Sentry',
    'Grafana',
    'Loki',
    'Prometheus',
  ],
  testing: ['Jest', 'Vitest', 'flutter_test', 'Scrum', 'Kanban'],
  ai: ['PyTorch', 'Ollama'],
};


/**
 * Pintura do hero: Claude Monet, "Arrival of the Normandy Train, Gare
 * Saint-Lazare" (1877), Art Institute of Chicago, domínio público (imagem CC0).
 */
export const HERO_ART = {
  src: 'art/monet-gare-saint-lazare-1280.webp',
  srcset:
    'art/monet-gare-saint-lazare-800.webp 800w, art/monet-gare-saint-lazare-1280.webp 1280w, art/monet-gare-saint-lazare-1686.webp 1686w',
  width: 1686,
  height: 1265,
  sourceUrl: 'https://www.artic.edu/artworks/16571',
} as const;
