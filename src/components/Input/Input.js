import React from 'react';
import { StyledInput } from './StyledInput';

const Input = ({ onChange, type, width, name, isValid, onFocus, onBlur }) => (
  <StyledInput
    onChange={onChange}
    type={type}
    width={width}
    name={name}
    isValid={isValid}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

export default Input;
