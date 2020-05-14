import { TYPES } from '../reducers/customersReducer';

const setCustomers = payload => ({
  type: TYPES.GET_CUSTOMERS,
  payload
});

const setCurrent = payload => ({
  type: TYPES.GET_CURRENT,
  payload
});

export { setCustomers, setCurrent };
