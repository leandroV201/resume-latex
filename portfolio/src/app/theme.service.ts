import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

import { matchMediaQuery } from './scroll';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Tema claro/escuro. Sem escolha salva, segue o sistema; ao alternar, a
 * escolha fica salva. O script em index.html aplica o tema salvo antes da
 * primeira pintura, para não piscar.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly media = matchMediaQuery(this.document, '(prefers-color-scheme: dark)');

  private readonly system = signal<Theme>(this.media?.matches ? 'dark' : 'light');
  private readonly chosen = signal<Theme | null>(this.readStorage());

  readonly theme = computed<Theme>(() => this.chosen() ?? this.system());

  constructor() {
    this.media?.addEventListener('change', (event) =>
      this.system.set(event.matches ? 'dark' : 'light'),
    );

    effect(() => {
      const chosen = this.chosen();
      const root = this.document.documentElement;
      if (chosen) {
        root.dataset['theme'] = chosen;
      } else {
        delete root.dataset['theme'];
      }
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.chosen.set(next);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Armazenamento bloqueado: o tema vale só para esta visita.
    }
  }

  private readStorage(): Theme | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
