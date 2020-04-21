import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_COMPANIES: 'GET_COMPANIES',
  SET_FILTER: 'SET_FILTER'
};

const setCompanies = payload => ({
  type: TYPES.GET_COMPANIES,
  payload
});

const setFilter = payload => ({ type: TYPES.SET_FILTER, payload });

const getCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.PROD}/api/companies`, {
      'x-auth-token': token
    });
    if (data.companies) {
      dispatch(setCompanies(data.companies));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'api.js getCompanies data.companies'
      });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js getCompanies catch' });
  }
};

const delCompanies = companies => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.PROD}/api/companies/del`, {
      'x-auth-token': token,
      companies
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js delCompanies data.message'
      });
    } else {
      dispatch(getCompanies());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js delCompanies catch' });
  }
};

const addCompany = ({
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
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(
      `${endpoints.PROD}/api/companies/create`,
      {
        'x-auth-token': token,
        company: {
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
      }
    );
    if (data.message) {
      addError({
        text: data.message,
        data: 'api.js addCompany data.message'
      });
    } else {
      dispatch(getCompanies());
      addSuccess({ text: 'Saved changes.' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'api.js addCompany catch' });
  }
};

export {
  TYPES,
  getCompanies,
  addCompany,
  delCompanies,
  setCompanies,
  setFilter
};
