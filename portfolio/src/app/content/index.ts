import type { Content, Lang } from './content.model';
import { EN } from './en';
import { PT_BR } from './pt-br';

export * from './content.model';
export * from './facts';

export const CONTENT: Readonly<Record<Lang, Content>> = {
  'pt-BR': PT_BR,
  en: EN,
};

export const LANGS: readonly Lang[] = ['pt-BR', 'en'];
