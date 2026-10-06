/** matchMedia quando existir (ausente em ambientes de teste e navegadores muito antigos). */
export function matchMediaQuery(document: Document, query: string): MediaQueryList | undefined {
  const view = document.defaultView;
  return typeof view?.matchMedia === 'function' ? view.matchMedia(query) : undefined;
}

/**
 * Rola até a seção sem trocar a URL: com base href (GitHub Pages), um
 * href="#id" relativo recarregaria a página e perderia o ?lang.
 * Move o foco para a seção, para leitores de tela e navegação por teclado.
 */
export function scrollToSection(document: Document, event: Event, id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = matchMediaQuery(document, '(prefers-reduced-motion: reduce)')?.matches;
  target.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth' });
  target.focus({ preventScroll: true });
}
