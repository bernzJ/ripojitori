const TYPES = {
  GET_TOKEN: 'GET_TOKEN',
  SET_TOKEN: 'SET_TOKEN',
  SET_LOADING: 'SET_LOADING',
  SET_SAVED: 'SET_SAVED'
};

const getToken = payload => ({ type: TYPES.GET_TOKEN, payload });

const setToken = payload => ({ type: TYPES.SET_TOKEN, payload });

const setLoading = payload => ({ type: TYPES.SET_LOADING, payload });

const setSaved = payload => ({ type: TYPES.SET_SAVED, payload });

export { TYPES, getToken, setToken, setLoading, setSaved };
