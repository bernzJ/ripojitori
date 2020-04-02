import axios from 'axios';

import { setMessage, setMessageAndInvalidateSession } from './messages';

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

    const { data } = await axios.post('api/companies', {
      'x-auth-token': token
    });
    if (data.companies) {
      dispatch(setCompanies(data.companies));
    } else {
      console.log(data);
      dispatch(setMessage(data));
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
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

    const { data } = await axios.post('api/companies/del', {
      'x-auth-token': token,
      companies
    });
    if (data.message) {
      dispatch(setMessage(data));
    } else {
      dispatch(
        setMessage({
          message: `Sent query, deleted: ${data.result.deletedCount} companies.`
        })
      );
      dispatch(getCompanies());
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
  }
};

const addCompany = ({
  _id,
  name,
  clientName,
  clientType,
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
    const { data } = await axios.post('api/companies/create', {
      'x-auth-token': token,
      company: { _id, name, clientName, clientType, hours, start, end, scope }
    });
    if (data.message) {
      dispatch(setMessage(data));
    } else {
      dispatch(
        setMessage({
          message: 'Saved changes.'
        })
      );
      dispatch(getCompanies());
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
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
