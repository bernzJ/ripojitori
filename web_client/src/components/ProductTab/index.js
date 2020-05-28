/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import styled from 'styled-components';
import classNames from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import Joi from '@hapi/joi';
import { addError } from 'redux-flash-messages';

import { setCurrent } from '../../actions/customers';
import Products from './Products';
import Segment from './Segment';
import { fetchUpdate } from './fetch';

const MainItemRow = styled(Row)`
  &&& {
    margin-top: 10px;
    background-color: #fff;
    padding: 25px;
    transition: box-shadow 0.15s ease-in-out;
  }
  &&&:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  }
`;
const Labby = styled.label`
  &&& {
    color: #00355c;
    width: 100%;
  }
`;
const ActionBoxContainer = styled.div`
  &&& {
    position: absolute;
    right: 50px;
    padding: 16px;
    cursor: pointer;
  }
`;

const ProductsTab = ({ unsaved }) => {
  const { current, token } = useSelector(state => ({
    current: state.customersReducer.current,
    token: state.authReducer.user.token
  }));
  const dispatch = useDispatch();

  const [state, setState] = useState({
    selectedProduct: null,
    selectedSegment: null,
    shouldUpdate: false
  });

  const { selectedProduct, selectedSegment, shouldUpdate } = state;

  useEffect(() => {
    unsaved(shouldUpdate);
    if (shouldUpdate) {
      window.onbeforeunload = () => 'Unsaved changes, are you sure?';
    } else {
      window.onbeforeunload = undefined;
    }
  }, [shouldUpdate]);

  const setDataParam = kv => setState({ ...state, shouldUpdate: true, ...kv });

  // Click handlers
  const handleSaveButton = () => {
    const schema = Joi.object({
      ConcurProductId: Joi.number().default(-1),
      CustomerId: Joi.number().required(),
      Id: Joi.number().default(-1),
      ProductId: Joi.number().default(-1),
      Product: Joi.string().required(),
      SegmentId: Joi.number().default(-1),
      SegmentName: Joi.string().default('')
    });

    const productSchema = schema.validate(
      { ...selectedProduct, ...selectedSegment },
      { stripUnknown: true }
    );
    if (productSchema.error) {
      const {
        error: { details }
      } = productSchema;
      addError({
        text: details[0].message,
        data: 'CoreTab.js handleSaveButton companySchema.error'
      });
    } else {
      (async () => {
        await fetchUpdate(token, productSchema.value);
      })();
      setState({ ...state, shouldUpdate: false });
    }
  };

  if (!current) {
    return <div className="p-5">Nothing selected</div>;
  }
  return (
    <Container className="p-5" fluid>
      <Prompt when={shouldUpdate} message="Unsaved changes, are you sure?" />
      <ActionBoxContainer>
        <FontAwesomeIcon
          onClick={() => {
            if (
              !shouldUpdate ||
              window.confirm('Unsaved changes, are you sure?')
            ) {
              dispatch(setCurrent({}));
            }
          }}
          className="mr-3"
          color="#c3c3c3"
          size="2x"
          icon={faPlus}
        />
        <FontAwesomeIcon
          className={classNames({
            'd-none': !shouldUpdate
          })}
          onClick={handleSaveButton}
          color="#c3c3c3"
          size="2x"
          icon={faSave}
        />
      </ActionBoxContainer>
      <MainItemRow className="justify-content-start">
        <Col xl={5} className="mx-3">
          <Row>
            <Labby>Products</Labby>
          </Row>
          <Row>
            <Products
              token={token}
              customerId={current.Id}
              handleChange={selectedProduct =>
                setState({ ...state, selectedProduct })
              }
            />
          </Row>
        </Col>
        <Col xl={5} className="mx-3">
          <Row>
            <Labby>Segment</Labby>
          </Row>
          <Row>
            <Segment
              Segment={selectedProduct}
              handleChange={selectedSegment =>
                setDataParam({ selectedSegment })
              }
            />
          </Row>
        </Col>
      </MainItemRow>
    </Container>
  );
};

ProductsTab.propTypes = {
  unsaved: PropTypes.func.isRequired
};

export default ProductsTab;
