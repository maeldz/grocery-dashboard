import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@rocketseat/unform';

import translate, { dateLanguage } from '../../../locales';

registerLocale('language', dateLanguage);

export default function DatePicker() {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField('birthday');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        id="date-picker"
        placeholderText={translate('add_admin_birthday_placeholder')}
        dateFormat="PPP"
        locale="language"
        className="form-control input-md"
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
      />

      {error && <span>{error}</span>}
    </>
  );
}
