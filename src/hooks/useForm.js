import { useEffect, useReducer } from 'react';
import isObject from 'lodash.isobject';
import isFunction from 'lodash.isfunction';
import { createReducer } from '../utils';

/**
 * Creates a form state with validators
 * @param {*} state
 * @param {*} validators
 */
const validateFormInputs = (state, validators) => {
  const stateReducer = (acc, [key, validate]) => {
    const { value } = state[key];
    const isValid = validate(value);

    acc[key] = { value, isValid };
    return acc;
  };
  const validatorEntries = Object.entries(validators);
  return validatorEntries.reduce(stateReducer, {});
};

/**
 * Action types..
 */
const SET_FIELDS = 'SET_FIELDS';
const SET_IS_COMPLETED = 'SET_IS_COMPLETED';
const SET_DISPLAY_ERRORS = 'SET_DISPLAY_ERRORS';
const RESET_FORM = 'RESET_FORM';

/**
 * Action creators..
 */
const actions = {
  setFields: (fields, validators) => {
    if (!isObject(validators)) {
      throw new Error('Error: validators must be an object');
    }

    if (!isObject(fields)) {
      throw new Error('Error: fields must be an object');
    }

    Object.values(validators).forEach((validator) => {
      if (!isFunction(validator)) {
        throw new Error('Error: validators must be functions');
      }
    });

    return { type: SET_FIELDS, fields, validators };
  },
  setIsCompleted: (isCompleted) => ({
    type: SET_IS_COMPLETED,
    isCompleted,
  }),
  setDisplayErrors: (displayErrors) => ({
    type: SET_DISPLAY_ERRORS,
    displayErrors,
  }),
  resetForm: (defaultState) => ({
    type: RESET_FORM,
    defaultState,
  }),
};

/**
 * Reducers..
 */
const handlers = {
  [SET_FIELDS]: (state, { fields, validators }) => {
    const validatedInputForms = validateFormInputs(fields, validators);
    return { ...state, ...validatedInputForms };
  },
  [SET_IS_COMPLETED]: (state, { isCompleted }) => ({
    ...state,
    isCompleted,
  }),
  [SET_DISPLAY_ERRORS]: (state, { displayErrors }) => ({
    ...state,
    displayErrors,
  }),
  [RESET_FORM]: (state, { defaultState }) => ({
    ...state,
    ...defaultState,
  }),
};

/**
 * @param {*} validators
 * @param {*} formState
 */
const createDefaultState = (validators, formState) => {
  const validatorEntries = Object.entries(validators);
  const formStateReducer = (acc, [key, validate]) => {
    const value = formState[key];
    const isValid = validate(value);
    acc[key] = { value, isValid };
    return acc;
  };

  const completeFormState = validatorEntries.reduce(formStateReducer, {});
  const isCompleted = false;
  const displayErrors = [];
  const defaultState = { ...completeFormState, isCompleted, displayErrors };

  return defaultState;
};

/**
 * @param {*} callback
 * @param {*} validate - validation method
 * @param {*} draft - for the setup state you want to implement
 */
const useForm = (callback, validators, formState) => {
  const defaultState = createDefaultState(validators, formState);
  const reducer = createReducer(defaultState, handlers);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { isCompleted, displayErrors, ...inputState } = state;
  const stateValues = Object.values(inputState);
  const hasNoErrors = stateValues.every(({ isValid }) => !!isValid);

  useEffect(() => {
    const action = actions.setIsCompleted(!!hasNoErrors);
    dispatch(action);
  }, [hasNoErrors]);

  /**
   * Makes sure error is shown when blurring
   */
  const handleBlur = (event) => {
    const { name } = event.target;
    const { value, isValid } = state[name];
    if (!!value.length && !isValid) {
      const displayErrorSet = [...new Set([...state.displayErrors, name])];
      const action = actions.setDisplayErrors(displayErrorSet);
      dispatch(action);
    }
  };

  /**
   * Handles the input value changes and uses name
   * as a variable to know that input is selected.
   * @param {*} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    // clean up display errors when input is reset
    if (!value.length) {
      const displayErrors = state.displayErrors.filter((err) => err !== name);
      const displayErrorSet = [...new Set(displayErrors)];
      const action = actions.setDisplayErrors(displayErrorSet);
      dispatch(action);
    }

    const action = actions.setFields(
      {
        ...state,
        [name]: { value },
      },
      validators
    );
    dispatch(action);
  };

  /**
   * Handles our submit with the usage of callback and
   * prevents default so the page doesnt refresh.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const action = actions.resetForm(defaultState);
    dispatch(action);
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
  };
};

export default useForm;
