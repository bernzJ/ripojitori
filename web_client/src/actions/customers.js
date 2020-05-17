import { TYPES } from '../reducers/customersReducer';

const addCustomer = payload => ({
  type: TYPES.ADD_CUSTOMER,
  payload
});

const setCustomers = payload => ({
  type: TYPES.GET_CUSTOMERS,
  payload
});

const setCurrent = payload => ({
  type: TYPES.GET_CURRENT,
  payload
});

export { addCustomer, setCustomers, setCurrent };
