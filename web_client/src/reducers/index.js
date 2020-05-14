import { combineReducers } from 'redux';
import { flashMessage } from 'redux-flash-messages';
import { authReducer } from './authReducer';
import { adminReducer } from './adminReducer';
import { customersReducer } from './customersReducer';
import { industriesReducer } from './industriesReducer';
import { timezonesReducer } from './timezonesReducer';
import { countriesReducer } from './countriesReducer';
import { OMSReducer } from './OMSReducer';
import { statesReducer } from './statesReducer';
import { notesReducer } from './notesReducer';
import { useApiReducer } from './useApiReducer';

const createRootReducer = () => {
  return combineReducers({
    flashMessage,
    authReducer,
    adminReducer,
    customersReducer,
    industriesReducer,
    timezonesReducer,
    countriesReducer,
    OMSReducer,
    statesReducer,
    notesReducer,
    useApiReducer
  });
};

export default createRootReducer;
