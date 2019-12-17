import styled from 'styled-components';
import bg from '../../assets/img/login-bg.png';

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${bg});
`;

export const ErrorContainer = styled.div`
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;

  a {
    font-family: 'Montserrat', sans-serif;
    display: inline-block;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    padding: 13px 23px;
    background: #325d88;
    font-size: 18px;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;

    &:hover {
      color: #fff;
      background: #244363;
    }
  }

  div {
    position: relative;
    height: 200px;
    margin: 0px auto 20px;

    z-index: -1;

    h1 {
      background: #fff;
      font-family: 'Montserrat', sans-serif;
      font-size: 236px;
      font-weight: 200;
      padding-bottom: 120px;
      color: #211b19;
      text-transform: uppercase;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 28px;
      font-weight: 400;
      text-transform: uppercase;
      color: #211b19;
      background: #fff;
      padding: 10px 5px;
      margin: auto;
      display: inline-block;
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
    }
  }
`;
