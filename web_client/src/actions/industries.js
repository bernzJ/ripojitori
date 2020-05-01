import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_INDUSTRIES: 'GET_INDUSTRIES'
};

const setIndustries = payload => ({
  type: TYPES.GET_INDUSTRIES,
  payload
});

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getIndustries = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/industries`, {
      'x-auth-token': token
    });
    if (data.industries) {
      dispatch(setIndustries(data.industries));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'api.js getIndustries data.industries'
      });
      dispatch(apiLogout());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js getIndustries catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const delIndustry = industry => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/industries/del`, {
      'x-auth-token': token,
      industry
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js delIndustry data.message'
      });
    } else {
      dispatch(getIndustries());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js delIndustry catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const addIndustry = industry => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(
      `${endpoints.DEV}/api/industries/create`,
      {
        'x-auth-token': token,
        industry
      }
    );
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js addIndustry data.message'
      });
    } else {
      dispatch(getIndustries());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js addIndustry catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getIndustries, addIndustry, delIndustry, setIndustries };
