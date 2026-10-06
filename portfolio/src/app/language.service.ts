import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { CONTENT, LANGS, type Lang } from './content';

const STORAGE_KEY = 'lang';
const QUERY_PARAM = 'lang';

/**
 * Idioma ativo do site. Ordem de escolha na primeira visita:
 * ?lang= na URL > escolha salva > idioma do navegador > PT-BR.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly lang = signal<Lang>(this.detect());
  readonly content = computed(() => CONTENT[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      const { meta } = this.content();
      this.document.documentElement.lang = lang;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.persist(lang);
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  private detect(): Lang {
    const window = this.document.defaultView;
    const fromUrl = this.parse(new URLSearchParams(window?.location.search).get(QUERY_PARAM));
    if (fromUrl) return fromUrl;

    const stored = this.parse(this.readStorage());
    if (stored) return stored;

    const browser = window?.navigator.language ?? '';
    return browser.toLowerCase().startsWith('pt') || !browser ? 'pt-BR' : 'en';
  }

  private parse(value: string | null): Lang | null {
    if (!value) return null;
    const normalized = value.toLowerCase();
    return LANGS.find((lang) => lang.toLowerCase() === normalized) ?? (normalized === 'pt' ? 'pt-BR' : null);
  }

  /** Mantém a URL compartilhável (?lang=en) e lembra a escolha do visitante. */
  private persist(lang: Lang): void {
    const window = this.document.defaultView;
    if (!window) return;

    const url = new URL(window.location.href);
    url.searchParams.set(QUERY_PARAM, lang);
    window.history.replaceState(window.history.state, '', url);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Armazenamento bloqueado (modo privado etc.): o site funciona sem ele.
    }
  }

  private readStorage(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }
}
