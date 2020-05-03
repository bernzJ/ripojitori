import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_OMS: 'GET_OMS'
};

const setOMS = payload => ({
  type: TYPES.GET_OMS,
  payload
});

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getOMS = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/oms`, {
      'x-auth-token': token
    });
    if (data.oms) {
      dispatch(setOMS(data.oms));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'OMS.js getOMS data.OMS'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'OMS.js getOMS catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const delOMS = oms => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/OMS/del`, {
      'x-auth-token': token,
      oms
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'OMS.js delOMS data.message'
      });
    } else {
      dispatch(getOMS());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'OMS.js delOMS catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const addOMS = oms => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/OMS/create`, {
      'x-auth-token': token,
      oms
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'OMS.js addOMS data.message'
      });
    } else {
      dispatch(getOMS());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'OMS.js addOMS catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getOMS, addOMS, delOMS, setOMS };
