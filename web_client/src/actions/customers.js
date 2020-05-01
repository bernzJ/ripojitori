import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_CUSTOMERS: 'GET_CUSTOMERS'
};

const setCustomers = payload => ({
  type: TYPES.GET_CUSTOMERS,
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
        data: 'api.js getCustomers data.customers'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js getCustomers catch' });
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
        data: 'api.js delCustomers data.message'
      });
    } else {
      dispatch(getCustomers());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js delCustomers catch' });
  } finally {
    dispatch(setLoading(false));
  }
};
// @TODO: fix this (params)
const addCustomer = ({
  _id,
  projectResource,
  clientName,
  segment,
  category,
  status,
  hours,
  start,
  end,
  scope
}) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/api/customers/create`, {
      'x-auth-token': token,
      customer: {
        _id,
        projectResource,
        clientName,
        segment,
        category,
        status,
        hours,
        start,
        end,
        scope
      }
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js addCustomer data.message'
      });
    } else {
      dispatch(getCustomers());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js addCustomer catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getCustomers, addCustomer, delCustomers, setCustomers };
