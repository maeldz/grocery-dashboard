import currencyFormatter from 'currency-formatter';

import { locale } from '../locales';

const formatPrice = price => {
  return currencyFormatter.format(price, {
    locale,
  });
};

const formatCPF = cpf => {
  // retira os caracteres indesejados...
  const cpfFormatted = cpf.replace(/[^\d]/g, '');

  // realizar a formatação...
  return cpfFormatted.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatPhone = phone => {
  const ddd = phone.substring(0, 2);

  if (phone.length === 10) {
    return `(${ddd}) ${phone.substring(2, 7)}-${phone.substring(7, 10)}`;
  }
  if (phone.length === 11) {
    return `(${ddd}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
  }

  return phone;
};

export { formatCPF, formatPrice, formatPhone };
