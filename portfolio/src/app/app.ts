import { ChangeDetectionStrategy, Component, DOCUMENT, computed, inject } from '@angular/core';

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
import { LanguageService } from './language.service';

const LANG_LABELS: Record<Lang, { short: string; name: string }> = {
  'pt-BR': { short: 'PT-BR', name: 'Português' },
  en: { short: 'EN', name: 'English' },
};

@Component({
  selector: 'app-root',
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
  protected readonly langs = LANGS.map((code) => ({ code, ...LANG_LABELS[code] }));
  protected readonly year = new Date().getFullYear();

  /** O CV do idioma ativo vem primeiro; o outro fica como alternativa. */
  protected readonly cvLinks = computed(() => {
    const t = this.t().hero;
    const other: Lang = this.lang() === 'pt-BR' ? 'en' : 'pt-BR';
    return [
      { href: CV_FILES[this.lang()], label: t.cvPrimary, hreflang: this.lang(), primary: true },
      { href: CV_FILES[other], label: t.cvSecondary, hreflang: other, primary: false },
    ];
  });

  protected setLang(lang: Lang): void {
    this.language.set(lang);
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

  /**
   * Rola até a seção sem trocar a URL: com base href (GitHub Pages), um
   * href="#id" relativo recarregaria a página e perderia o ?lang.
   */
  protected goTo(event: Event, id: string): void {
    const target = this.document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    target.focus({ preventScroll: true });
  }

  private month({ year, month }: YearMonth): string {
    return `${this.t().months[month - 1]} ${year}`;
  }
}
