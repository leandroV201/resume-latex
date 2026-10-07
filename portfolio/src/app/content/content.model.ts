import type { EducationId, ExperienceId, ProjectId, RoleId, SkillGroupId } from './facts';

export type Lang = 'pt-BR' | 'en';

export interface LinkText {
  label: string;
  href: string;
}

export interface ProjectText {
  /** Onde o projeto aconteceu (empresa ou contexto). */
  org?: string;
  role: string;
  /** O que o projeto resolve, em uma frase. */
  summary: string;
  bullets: readonly string[];
  note?: LinkText & { text: string };
  linkLabel?: string;
  /** Exibido quando não há período confirmado (ex.: projeto em andamento). */
  status?: string;
  /** Aviso para projetos sem código público. */
  privateCode?: string;
}

export interface RoleText {
  title: string;
  bullets: readonly string[];
}

export interface ExperienceText {
  roles: Readonly<Partial<Record<RoleId, RoleText>>>;
}

export interface EducationText {
  course: string;
  detail?: string;
}

/**
 * Todo o texto do site em um idioma. PT-BR e EN implementam esta mesma
 * interface: se uma chave faltar em um dos idiomas, o build quebra.
 */
export interface Content {
  meta: { title: string; description: string };
  skipLink: string;
  /** Texto para leitores de tela em links que abrem outra aba. */
  newTab: string;
  nav: {
    label: string;
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  langSwitch: { label: string };
  theme: { toDark: string; toLight: string };
  months: readonly string[];
  present: string;
  inProgress: string;

  hero: {
    role: string;
    location: string;
    intro: string;
    ctaProjects: string;
    ctaCv: string;
    /** Link para o CV no outro idioma. */
    cvOther: string;
  };

  about: {
    title: string;
    paragraphs: readonly string[];
    /** Cartel com os fatos atuais. */
    record: {
      label: string;
      role: string;
      company: string;
      companyNote: string;
      since: string;
      project: string;
      stack: string;
      base: string;
      education: string;
      educationValue: string;
    };
  };

  experience: {
    title: string;
    cta: string;
    items: Readonly<Record<ExperienceId, ExperienceText>>;
  };

  projects: {
    title: string;
    intro: string;
    stackLabel: string;
    items: Readonly<Record<ProjectId, ProjectText>>;
  };

  skills: {
    title: string;
    groups: Readonly<Record<SkillGroupId, string>>;
    /** Tradução de conceitos listados em facts.SKILLS (tecnologias não se traduzem). */
    terms: Readonly<Record<string, string>>;
    languagesTitle: string;
    languages: readonly string[];
  };

  education: {
    title: string;
    items: Readonly<Record<EducationId, EducationText>>;
    coursesTitle: string;
    courses: readonly string[];
  };

  contact: {
    title: string;
    text: string;
    email: string;
    cvTitle: string;
    cvLangs: Readonly<Record<Lang, string>>;
    cvDownload: string;
    cvView: string;
  };

  footer: {
    source: string;
    sourceLink: string;
  };
}
