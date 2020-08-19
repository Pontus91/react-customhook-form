import React from 'react';
import {
  Container,
  FormWrapper,
  Header,
  Label,
  StyledMail,
  StyledLock,
  RegisterButton,
  StyledErrorText,
} from './StyledApp';
import Input from './components/Input/Input';
import useForm from './hooks/useForm';
import { RegisterDraft } from './staticData/RegisterData';
import {
  validators,
  isInvalidEmail,
  isInvalidPassword,
  isInvalidConfirmPassword,
} from './validators/Register';
import Wrapper from './components/Wrapper/Wrapper';
import ERRORS from './constants/error-messages';

const App = () => {
  const createUser = () => {
    // your API request goes here!
    console.log('You succesfully registered your account');
  };

  const { handleChange, handleSubmit, handleBlur, state } = useForm(
    createUser,
    validators,
    RegisterDraft
  );

  return (
    <Container>
      <FormWrapper>
        <Header>Register</Header>
        <Wrapper width={'87%'} direction={'row'} mediaDirection={'row'}>
          <Label>
            <StyledMail size={12} />
            Email
          </Label>

          {isInvalidEmail(state) && (
            <StyledErrorText>{ERRORS.emailInvalid}</StyledErrorText>
          )}
        </Wrapper>
        <Input
          type={'email'}
          width={'70%'}
          name={'email'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={state.email.value}
          isValid={state.email.isValid}
        />
        <Wrapper width={'87%'} direction={'row'} mediaDirection={'row'}>
          <Label>
            <StyledLock size={12} />
            Password
          </Label>

          {isInvalidPassword(state) && (
            <StyledErrorText>{ERRORS.passwordInvalid}</StyledErrorText>
          )}
        </Wrapper>
        <Input
          type={'password'}
          width={'70%'}
          name={'password'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={state.password.value}
          isValid={state.password.isValid}
        />
        <Wrapper width={'87%'} direction={'row'} mediaDirection={'row'}>
          <Label>
            <StyledLock size={12} />
            Confirm Password
          </Label>
          {isInvalidConfirmPassword(state) && (
            <StyledErrorText>{ERRORS.confirmPasswordInvalid}</StyledErrorText>
          )}
        </Wrapper>
        <Input
          type={'password'}
          width={'70%'}
          name={'confirmPassword'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={state.confirmPassword.value}
          isValid={state.confirmPassword.isValid}
        />
        <RegisterButton onClick={handleSubmit} disabled={!state.isCompleted}>
          Register
        </RegisterButton>
      </FormWrapper>
    </Container>
  );
};

export default App;
