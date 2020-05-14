import { TYPES } from '../reducers/statesReducer';

const setStates = payload => ({
  type: TYPES.GET_STATES,
  payload
});

export { setStates };
