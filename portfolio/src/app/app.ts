import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import {
  CV_FILES,
  EDUCATION,
  EXPERIENCE,
  LANGS,
  PROFILE,
  PROJECTS,
  SKILLS,
  SKILL_GROUP_IDS,
  type Lang,
  type Period,
  type YearMonth,
} from './content';
import { Icon } from './icon';
import { LanguageService } from './language.service';
import { matchMediaQuery, scrollToSection } from './scroll';
import { SiteHeader } from './site-header';

const SECTION_IDS = ['top', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];

/**
 * "Luz" de cada trecho da página, como nas séries de Monet (o mesmo motivo
 * de manhã, de dia, à tarde e ao anoitecer). O CSS troca as cores com uma
 * transição suave quando a luz muda.
 */
type Light = 'morning' | 'day' | 'afternoon' | 'dusk';
const SECTION_LIGHT: Record<string, Light> = {
  top: 'morning',
  about: 'morning',
  experience: 'day',
  projects: 'day',
  skills: 'afternoon',
  education: 'afternoon',
  contact: 'dusk',
};

@Component({
  selector: 'app-root',
  imports: [Icon, SiteHeader],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly language = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  protected readonly lang = this.language.lang;
  protected readonly t = this.language.content;

  protected readonly profile = PROFILE;
  protected readonly projects = PROJECTS;
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;
  protected readonly skillGroups = SKILL_GROUP_IDS.map((id) => ({ id, items: SKILLS[id] }));
  protected readonly year = new Date().getFullYear();

  /** Seção visível no meio da tela, para marcar o item ativo da navegação. */
  protected readonly activeSection = signal('top');

  /** CV no idioma da página e no outro idioma. */
  protected readonly cv = computed(() => {
    const current = this.lang();
    const other: Lang = current === 'pt-BR' ? 'en' : 'pt-BR';
    return {
      current: { href: CV_FILES[current], lang: current },
      other: { href: CV_FILES[other], lang: other },
      all: LANGS.map((code) => ({ code, href: CV_FILES[code], label: this.t().contact.cvLangs[code] })),
    };
  });

  /** Cartel da seção Sobre: fatos atuais, montados a partir de facts.ts + textos do idioma. */
  protected readonly record = computed(() => {
    const r = this.t().about.record;
    const job = EXPERIENCE[0];
    const project = PROJECTS[0];
    return [
      { label: r.role, value: this.t().hero.role },
      { label: r.company, value: job.company, note: r.companyNote },
      { label: r.since, value: this.month(job.period.start) },
      { label: r.project, value: project.name },
      { label: r.stack, value: project.stack.join(', ') },
      { label: r.base, value: this.t().hero.location },
      { label: r.education, value: r.educationValue },
    ];
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Quem pede menos movimento fica com uma luz fixa (sem trocas de cor).
    const reduceMotion = matchMediaQuery(this.document, '(prefers-reduced-motion: reduce)')?.matches;
    effect(() => {
      const root = this.document.documentElement;
      if (reduceMotion) {
        delete root.dataset['light'];
      } else {
        root.dataset['light'] = SECTION_LIGHT[this.activeSection()] ?? 'morning';
      }
    });

    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view || !('IntersectionObserver' in view)) return;
      // A faixa do meio da tela decide qual seção está "ativa".
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const id of SECTION_IDS) {
        const section = this.document.getElementById(id);
        if (section) observer.observe(section);
      }

      // A última seção é curta e pode nunca chegar ao meio da tela:
      // no fim da página, ela é a ativa.
      const onScroll = () => {
        const root = this.document.documentElement;
        if (view.innerHeight + view.scrollY >= root.scrollHeight - 4) {
          this.activeSection.set(SECTION_IDS[SECTION_IDS.length - 1]);
        }
      };
      view.addEventListener('scroll', onScroll, { passive: true });

      destroyRef.onDestroy(() => {
        observer.disconnect();
        view.removeEventListener('scroll', onScroll);
      });
    });
  }

  protected goTo(event: Event, id: string): void {
    scrollToSection(this.document, event, id);
  }

  /** "Java, Spring Boot e Angular" / "Java, Spring Boot, and Angular". */
  protected readonly listFormat = computed(
    () => new Intl.ListFormat(this.lang(), { style: 'long', type: 'conjunction' }),
  );

  protected list(items: readonly string[]): string {
    return this.listFormat().format(items);
  }

  protected term(item: string): string {
    return this.t().skills.terms[item] ?? item;
  }

  protected period(period: Period, inProgress = false): string {
    const end = period.end
      ? this.month(period.end)
      : inProgress
        ? this.t().inProgress
        : this.t().present;
    return `${this.month(period.start)} – ${end}`;
  }

  private month({ year, month }: YearMonth): string {
    return `${this.t().months[month - 1]} ${year}`;
  }
}
