import { TestBed } from '@angular/core/testing';

import { App } from './app';
import { CONTENT, CV_FILES } from './content';
import { LanguageService } from './language.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    history.replaceState(null, '', '/');
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    TestBed.inject(LanguageService).set('pt-BR');
    await fixture.whenStable();
    return { fixture, page: fixture.nativeElement as HTMLElement };
  }

  it('renderiza nome, seções e os dois CVs', async () => {
    const { page } = await render();

    expect(page.querySelector('h1')?.textContent).toContain('Leandro Victtorio Costa Campelo');
    for (const id of ['top', 'about', 'experience', 'projects', 'skills', 'education', 'contact']) {
      expect(page.querySelector(`#${id}`)).not.toBeNull();
    }
    const cvLinks = [...page.querySelectorAll<HTMLAnchorElement>('.cv-row a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(cvLinks).toEqual(expect.arrayContaining([CV_FILES['pt-BR'], CV_FILES.en]));
  });

  it('hero leva aos projetos e baixa o CV do idioma da página', async () => {
    const { page } = await render();
    const [projects, cv] = page.querySelectorAll<HTMLAnchorElement>('.hero-actions a');

    expect(projects.getAttribute('href')).toBe('#projects');
    expect(cv.getAttribute('href')).toBe(CV_FILES['pt-BR']);
    expect(cv.hasAttribute('download')).toBe(true);
    expect(cv.textContent).toContain('PT-BR');
  });

  it('troca o idioma da página pelo seletor', async () => {
    const { fixture, page } = await render();

    const enButton = [...page.querySelectorAll<HTMLButtonElement>('.lang-switch button')].find(
      (b) => b.getAttribute('lang') === 'en',
    )!;
    enButton.click();
    await fixture.whenStable();

    expect(document.documentElement.lang).toBe('en');
    expect(page.querySelector('#projects-title')?.textContent).toBe(CONTENT.en.projects.title);
    expect(enButton.getAttribute('aria-pressed')).toBe('true');
    expect(new URL(location.href).searchParams.get('lang')).toBe('en');
    expect(page.querySelector('.hero-actions a[download]')?.getAttribute('href')).toBe(CV_FILES.en);
  });

  it('alterna o tema e lembra a escolha', async () => {
    const { fixture, page } = await render();
    const before = document.documentElement.dataset['theme'];
    const toggle = page.querySelector<HTMLButtonElement>('.header-tools .icon-button:not(.menu-button)')!;

    toggle.click();
    await fixture.whenStable();

    const after = document.documentElement.dataset['theme'];
    expect(after).toMatch(/^(light|dark)$/);
    expect(after).not.toBe(before);
    expect(localStorage.getItem('theme')).toBe(after);
  });

  it('abre e fecha o menu mobile com aria-expanded', async () => {
    const { fixture, page } = await render();
    const button = page.querySelector<HTMLButtonElement>('.menu-button')!;
    const nav = page.querySelector('#site-nav')!;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(nav.classList).toContain('is-open');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('mostra a progressão de cargos na NextCompany', async () => {
    const { page } = await render();
    const firstJob = page.querySelector('.timeline-item')!;
    const roles = [...firstJob.querySelectorAll('.role .timeline-role span:first-child')].map((el) =>
      el.textContent?.trim(),
    );

    expect(roles).toEqual(['Desenvolvedor de Software Pleno', 'Desenvolvedor de Software Júnior']);
  });

  it('começa na luz da manhã (séries de Monet)', async () => {
    await render();
    expect(document.documentElement.dataset['light']).toBe('morning');
  });

  it('links só com ícone têm nome acessível e ícones ficam ocultos de leitores de tela', async () => {
    const { page } = await render();

    for (const link of page.querySelectorAll('a.icon-button, button.icon-button')) {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    }
    for (const icon of page.querySelectorAll('app-icon')) {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    }
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
