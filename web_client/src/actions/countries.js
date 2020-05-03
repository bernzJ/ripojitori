import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_COUNTRIES: 'GET_COUNTRIES'
};

const setCountries = payload => ({
  type: TYPES.GET_COUNTRIES,
  payload
});

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getCountries = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/countries`, {
      'x-auth-token': token
    });
    if (data.countries) {
      dispatch(setCountries(data.countries));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'countries.js getCountries data.countries'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'countries.js getCountries catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const delTimezone = country => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/countries/del`, {
      'x-auth-token': token,
      country
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'countries.js delTimezone data.message'
      });
    } else {
      dispatch(getCountries());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'countries.js delTimezone catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const addTimezone = country => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/countries/create`, {
      'x-auth-token': token,
      country
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'countries.js addTimezone data.message'
      });
    } else {
      dispatch(getCountries());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'countries.js addTimezone catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getCountries, addTimezone, delTimezone, setCountries };
