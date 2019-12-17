import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      border: 1px solid #dfd7ca;
      background: #fff;
    }

    input {
      display: none;
    }
  }
`;
