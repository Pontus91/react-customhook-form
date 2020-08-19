import styled from 'styled-components';

export const StyledInput = styled.input`
  margin-bottom: 20px;
  background: transparent;
  border: none;
  width: ${(props) => props.width};
  padding: 0.5rem;
  box-shadow: none;
  border-bottom: 1px solid ${({ isValid }) => (isValid ? 'green' : 'grey')};
  color: black;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }
  &:focus {
    outline: none;
  }
`;
