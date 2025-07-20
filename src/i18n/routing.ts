import { defineRouting } from 'next-intl/routing';
import { language } from '../../constants/language';

export const routing = defineRouting({
  locales: language,
  defaultLocale: 'pt'
});
