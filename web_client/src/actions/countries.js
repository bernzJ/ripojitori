import { TYPES } from '../reducers/countriesReducer';

const setCountries = payload => ({
  type: TYPES.GET_COUNTRIES,
  payload
});

export { setCountries };
