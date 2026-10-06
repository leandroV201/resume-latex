import type { EducationId, ExperienceId, ProjectId, SkillGroupId } from './facts';

export type Lang = 'pt-BR' | 'en';

export interface LinkText {
  label: string;
  href: string;
}

export interface ProjectText {
  role: string;
  summary: string;
  bullets: readonly string[];
  note?: LinkText & { text: string };
  linkLabel?: string;
  /** Exibido quando não há período confirmado (ex.: projeto em andamento). */
  status?: string;
}

export interface ExperienceText {
  title: string;
  bullets: readonly string[];
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
  nav: {
    label: string;
    about: string;
    projects: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
  };
  langSwitch: { label: string };
  months: readonly string[];
  present: string;
  inProgress: string;

  hero: {
    role: string;
    location: string;
    paragraphs: readonly string[];
    cvPrimary: string;
    cvSecondary: string;
    pdf: string;
  };

  projects: {
    title: string;
    intro: string;
    stackLabel: string;
    items: Readonly<Record<ProjectId, ProjectText>>;
  };

  experience: {
    title: string;
    items: Readonly<Record<ExperienceId, ExperienceText>>;
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
  };

  footer: {
    source: string;
    sourceLink: string;
  };
}
