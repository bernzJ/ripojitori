import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { api } from '../../constants';

const fetchUpdate = async (token, Product, didCancel = false) => {
  try {
    const {
      data: { result, message }
    } = await axios.post(api.products.create, {
      'x-auth-token': token,
      Product
    });
    if (!didCancel) {
      if (result) {
        addSuccess({ text: 'Saved !' });
      } else {
        addError({ text: message, data: 'fetchUpdate' });
      }
    }
  } catch ({ message }) {
    if (!didCancel) {
      addError({
        text: message
      });
    }
  }
};

const fetchProducts = async (token, Id, callback, didCancel = false) => {
  try {
    const {
      data: { products }
    } = await axios.post(api.products.get, {
      'x-auth-token': token,
      Id
    });
    if (!didCancel && callback) {
      callback(products);
    }
  } catch ({ message, response }) {
    if (!didCancel) {
      addError({
        text: response ? response.data : message
      });
    }
  }
};

export { fetchUpdate, fetchProducts };
