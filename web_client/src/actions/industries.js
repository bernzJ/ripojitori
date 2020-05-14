import { TYPES } from '../reducers/industriesReducer';

const setIndustries = payload => ({
  type: TYPES.GET_INDUSTRIES,
  payload
});

export { setIndustries };
