import styled from 'styled-components';
import { Mail, Lock } from 'react-feather';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a0d0d;
`;

export const FormWrapper = styled.div`
  width: 30%;
  height: 50%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9ef;
`;

export const Header = styled.h1`
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
`;

export const Label = styled.label`
  color: black;
  text-align: left;
  width: 40%;
  margin-left: 38px;
  font-size: 14px;
`;

export const StyledMail = styled(Mail)`
  margin-right: 10px;
  color: black;
`;

export const StyledLock = styled(Lock)`
  margin-right: 10px;
  color: black;
`;

export const RegisterButton = styled.button`
  margin: 15px 0px 30px 0px;
  width: 74%;
  height: 30px;
  color: #f9f9ef;
  background: ${({ disabled }) => (disabled ? 'grey' : '#4a0d0d')};
  font-weight: bold;
  &:hover {
    background: ${({ disabled }) => (disabled ? 'grey' : '#8e1414')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const StyledErrorText = styled.div`
  color: red;
  font-size: 11px;
  flex: 1;
`;
