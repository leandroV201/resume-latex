import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { LANGS, type Lang } from './content';
import { Icon } from './icon';
import { LanguageService } from './language.service';
import { scrollToSection } from './scroll';
import { ThemeService } from './theme.service';

const LANG_LABELS: Record<Lang, { short: string; name: string }> = {
  'pt-BR': { short: 'PT-BR', name: 'Português' },
  en: { short: 'EN', name: 'English' },
};

@Component({
  selector: 'app-site-header',
  imports: [Icon],
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu(true)' },
})
export class SiteHeader {
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private readonly themeService = inject(ThemeService);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  /** Id da seção visível no momento (scroll spy). */
  readonly active = input<string>('top');

  protected readonly t = this.language.content;
  protected readonly lang = this.language.lang;
  protected readonly theme = this.themeService.theme;
  protected readonly menuOpen = signal(false);
  protected readonly langs = LANGS.map((code) => ({ code, ...LANG_LABELS[code] }));

  protected readonly sections = computed(() => {
    const nav = this.t().nav;
    return [
      { id: 'about', label: nav.about },
      { id: 'experience', label: nav.experience },
      { id: 'projects', label: nav.projects },
      { id: 'skills', label: nav.skills },
      { id: 'education', label: nav.education },
      { id: 'contact', label: nav.contact },
    ];
  });

  protected go(event: Event, id: string): void {
    this.menuOpen.set(false);
    scrollToSection(this.document, event, id);
  }

  protected setLang(lang: Lang): void {
    this.language.set(lang);
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (returnFocus) this.menuButton()?.nativeElement.focus();
  }
}
