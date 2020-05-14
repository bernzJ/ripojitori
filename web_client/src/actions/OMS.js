import { TYPES } from '../reducers/OMSReducer';

const setOMS = payload => ({
  type: TYPES.GET_OMS,
  payload
});

export { setOMS };
