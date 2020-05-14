import { TYPES } from '../reducers/timezonesReducer';

const setTimezones = payload => ({
  type: TYPES.GET_TIMEZONES,
  payload
});

export { TYPES, setTimezones };
