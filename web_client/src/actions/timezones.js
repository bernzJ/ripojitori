import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_TIMEZONES: 'GET_TIMEZONES'
};

const setTimezones = payload => ({
  type: TYPES.GET_TIMEZONES,
  payload
});

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getTimezones = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/timezones`, {
      'x-auth-token': token
    });
    if (data.timezones) {
      dispatch(setTimezones(data.timezones));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'api.js getTimezones data.timezones'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js getTimezones catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const delTimezone = timezone => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/timezones/del`, {
      'x-auth-token': token,
      timezone
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js delTimezone data.message'
      });
    } else {
      dispatch(getTimezones());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js delTimezone catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const addTimezone = timezone => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/api/timezones/create`, {
      'x-auth-token': token,
      timezone
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js addTimezone data.message'
      });
    } else {
      dispatch(getTimezones());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js addTimezone catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getTimezones, addTimezone, delTimezone, setTimezones };
