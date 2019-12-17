import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, ErrorContainer } from './styles';
import translate from '../../locales';

export default function Error404() {
  return (
    <Wrapper>
      <ErrorContainer>
        <div>
          <h1>Oops!</h1>
          <h2>{translate('page_not_found_text')}</h2>
        </div>
        <Link to="/">{translate('back_to_the_home_text')}</Link>
      </ErrorContainer>
    </Wrapper>
  );
}
