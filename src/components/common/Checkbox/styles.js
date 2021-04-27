import styled from 'styled-components';

export const CheckboxWrapper = styled.div`
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  background: ${({ checked }) => (checked ? 'black' : 'none')};

  > div {
    line-height: 1;
    margin: auto;
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;
