import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_CUSTOMERS: 'GET_CUSTOMERS',
  GET_CURRENT: 'GET_CURRENT'
};

const setCustomers = payload => ({
  type: TYPES.GET_CUSTOMERS,
  payload
});

const setCurrent = payload => ({
  type: TYPES.GET_CURRENT,
  payload
});

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getCustomers = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/customers`, {
      'x-auth-token': token
    });
    if (data.customers) {
      dispatch(setCustomers(data.customers));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'customers.js getCustomers data.customers'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'customers.js getCustomers catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const delCustomers = customers => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/customers/del`, {
      'x-auth-token': token,
      customers
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'customers.js delCustomers data.message'
      });
    } else {
      dispatch(getCustomers());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'customers.js delCustomers catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const addCustomer = customer => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/customers/create`, {
      'x-auth-token': token,
      customer
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'customers.js addCustomer data.message'
      });
    } else {
      dispatch(getCustomers());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'customers.js addCustomer catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export {
  TYPES,
  getCustomers,
  addCustomer,
  delCustomers,
  setCustomers,
  setCurrent
};
