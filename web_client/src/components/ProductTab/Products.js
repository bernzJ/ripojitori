/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

import { buildSelectDefaultValues } from '../../constants/utils';
import { fetchProducts, fetchUpdate } from './fetch';

const CreatableSelectCustom = styled(CreatableSelect)`
  &&& {
    width: 100%;
  }
`;

const Products = ({ token, customerId, handleChange }) => {
  const [state, setState] = useState({
    products: [],
    selectedProduct: null,
    productsDefaultValues: []
  });

  useEffect(() => {
    let didCancel = false;
    fetchProducts(
      token,
      customerId,
      products =>
        setState({
          selectedProduct: null,
          products,
          productsDefaultValues: buildSelectDefaultValues(products, {
            value: 'ProductId',
            label: 'Product'
          })
        }),
      didCancel
    );
    setState({
      ...state,
      customerId
    });
    handleChange(null);
    return () => {
      didCancel = true;
    };
  }, [customerId]);

  if (customerId === -1) {
    return <div />;
  }

  const { selectedProduct, products, productsDefaultValues } = state;
  const addProduct = Product => {
    (async () => {
      await fetchUpdate(token, { CustomerId: customerId, Product });
      await fetchProducts(token, customerId, products =>
        setState({
          ...state,
          products,
          productsDefaultValues: buildSelectDefaultValues(products, {
            value: 'ProductId',
            label: 'Product'
          })
        })
      );
    })();
  };

  const handleSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        selectedProduct: null
      });
      handleChange(null);
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        selectedProduct: newValue
      });
      handleChange(products.find(p => p.ProductId === newValue.value));
    }
  };

  return (
    <CreatableSelectCustom
      classNamePrefix="react-select"
      isClearable
      value={selectedProduct}
      onCreateOption={addProduct}
      onChange={(newItem, actionMeta) =>
        handleSelectChange(newItem, actionMeta)
      }
      options={productsDefaultValues}
    />
  );
};

Products.propTypes = {
  token: PropTypes.string.isRequired,
  customerId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Products;
