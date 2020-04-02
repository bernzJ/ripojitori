const TYPES = {
  GET_TEST: 'GET_TEST',
  SET_TEST: 'GET_TEST',
  SET_LOADING: 'SET_LOADING'
};

const getTest = payload => ({ type: TYPES.GET_TEST, payload });

const setTest = payload => ({ type: TYPES.SET_TEST, payload });

const setLoading = payload => ({ type: TYPES.SET_LOADING, payload });

export { TYPES, getTest, setTest, setLoading };
