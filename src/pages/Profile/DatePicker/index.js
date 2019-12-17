import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';
import translate, { dateLanguage } from '../../../locales';

registerLocale('language', dateLanguage);

export default function DatePicker({ birthday }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField('birthday');
  const [selected, setSelected] = useState(parseISO(birthday));

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
        placeholderText={translate('profile_birthday_placeholder')}
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

DatePicker.propTypes = {
  birthday: PropTypes.string.isRequired,
};
