import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';

import { TYPES, initialState, useApiReducer } from '../reducers/useApiReducer';

const useApi = (initialUrl, body) => {
  const [payload, setPayload] = useState({
    initialUrl,
    body
  });

  const [state, dispatch] = useReducer(useApiReducer, initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: TYPES.FETCH_INIT });
      try {
        const result = await axios.post(payload.initialUrl, payload.body);
        if (!didCancel) {
          dispatch({ type: TYPES.FETCH_SUCCESS, payload: result.data });
        }
      } catch ({ message, response }) {
        if (!didCancel) {
          dispatch({
            type: TYPES.FETCH_FAILURE,
            payload: response ? response.data : message
          });
        }
      }
    };
    if (payload.initialUrl) {
      fetchData();
    }
    return () => {
      didCancel = true;
    };
  }, [payload]);

  return [state, setPayload];
};

export { useApi };
