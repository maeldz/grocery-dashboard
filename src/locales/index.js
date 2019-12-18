import I18n from 'i18n-js';
import { ptBR as pt_BR, enUS as en_US } from 'date-fns/locale';

// suported languages
import en from './en-US';
import pt from './pt-BR';

I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

// your language
export const locale = (navigator.language || navigator.userLanguage).replace(
  '-',
  '_',
);

const dateLanguages = { pt_BR, en_US };

// date-fns language based in your locale
export const dateLanguage = dateLanguages[locale];

I18n.locale = locale;

export default function translate(key) {
  return I18n.t(key);
}
