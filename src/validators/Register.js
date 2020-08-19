const emailRegex = /^([\w-.]+)@((\[[0-9]{2,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,3})(\]?)$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

const match = {};

const validators = {
  email: (val) => emailRegex.test(val),
  password: (val) => {
    match.password = val;
    return passwordRegex.test(val);
  },
  confirmPassword: (val) => passwordRegex.test(val) && val === match.password,
};

const isInvalidEmail = ({ email, displayErrors }) =>
  !email.isValid && !!email.value && displayErrors.includes('email');
const isInvalidPassword = ({ password, displayErrors }) =>
  !password.isValid && !!password.value && displayErrors.includes('password');
const isInvalidConfirmPassword = ({
  password,
  confirmPassword,
  displayErrors,
}) =>
  !confirmPassword.isValid &&
  !!confirmPassword.value &&
  password.value !== confirmPassword.value &&
  displayErrors.includes('confirmPassword');

export {
  validators,
  isInvalidEmail,
  isInvalidPassword,
  isInvalidConfirmPassword,
};
