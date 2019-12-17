import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:200, 400, 700');

  form#vd-form {
     span {
      color: #f00;
      font-weight: bold;

  }
}

.react-datepicker-wrapper {
    display: inline;
}

.link-button-container {
  display: flex;
  flex: 1;
  cursor: pointer;
}

.icon-text-align {
  display: 'flex';
  flex-direction: 'row';
  align-items: 'center';
}

.link-button {
  background-color: transparent;
  border: none;
  padding: 12px 15px;
  color: #fff;
}

.link-button:hover,
.link-button:focus {
  outline: 0;
  text-decoration: none;
}

.ts-sidebar-menu > .open > button {
  background: #33383e;
  border-left: 3px solid #37a6c4;
}

.radio-container > label {
  margin-right: 30px;

}
.radio-container > span {
  display: block;
}

form#vd-form input[type='radio']{
  padding-left: 0;
  position: relative;
  margin-left: 6px;
}
form#vd-form .radio {
  padding-left: 0;
}
`;
