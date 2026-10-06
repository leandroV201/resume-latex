import { TestBed } from '@angular/core/testing';

import { App } from './app';
import { CONTENT, CV_FILES } from './content';
import { LanguageService } from './language.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    history.replaceState(null, '', '/');
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('renderiza nome, seções e links dos dois CVs', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain('Leandro Victtorio Costa Campelo');
    for (const id of ['about', 'projects', 'experience', 'skills', 'education', 'contact']) {
      expect(page.querySelector(`#${id}`)).not.toBeNull();
    }
    const hrefs = [...page.querySelectorAll<HTMLAnchorElement>('.actions a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(expect.arrayContaining([CV_FILES['pt-BR'], CV_FILES.en]));
  });

  it('troca o idioma da página pelo seletor', async () => {
    const fixture = TestBed.createComponent(App);
    const language = TestBed.inject(LanguageService);
    language.set('pt-BR');
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    const enButton = [...page.querySelectorAll<HTMLButtonElement>('.lang-switch button')].find(
      (b) => b.getAttribute('lang') === 'en',
    )!;
    enButton.click();
    await fixture.whenStable();

    expect(document.documentElement.lang).toBe('en');
    expect(page.querySelector('#projects-title')?.textContent).toBe(CONTENT.en.projects.title);
    expect(enButton.getAttribute('aria-pressed')).toBe('true');
    expect(new URL(location.href).searchParams.get('lang')).toBe('en');
    expect(page.querySelector('.actions a')?.getAttribute('href')).toBe(CV_FILES.en);
  });
});

describe('LanguageService', () => {
  it('respeita ?lang= na URL', () => {
    history.replaceState(null, '', '/?lang=en');
    TestBed.resetTestingModule();
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });
});

/**
 * As duas versões precisam contar os mesmos fatos. Os tipos já garantem as
 * mesmas chaves; aqui garantimos também a mesma quantidade de itens.
 */
describe('Conteúdo PT-BR x EN', () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.length
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.entries(value)
              .filter(([key]) => key !== 'terms')
              .map(([key, v]) => [key, shape(v)]),
          )
        : typeof value;

  it('tem a mesma estrutura e quantidade de itens', () => {
    expect(shape(CONTENT.en)).toEqual(shape(CONTENT['pt-BR']));
  });
});
