/**
 *
 * @param defaultState - initial state
 * @param handlers - object of reducer cases
 */
const createReducer = (defaultState, handlers) => {
  const nextState = (state = defaultState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;
  return nextState;
};

export { createReducer };
