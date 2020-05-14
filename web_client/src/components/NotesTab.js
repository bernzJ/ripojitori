import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addError, addSuccess } from 'redux-flash-messages';

import Loading from './Loading';
import { endpoints } from '../constants';

const ActionBoxContainer = styled.div`
  &&& {
    position: absolute;
    right: 50px;
    padding: 16px;
    cursor: pointer;
  }
`;
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
const Areay = styled.textarea`
  &&& {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

const NotesTab = props => {
  const dispatch = useDispatch();
  const { current, token } = useSelector(state => ({
    current: state.customersReducer.current,
    token: state.authReducer.user.token
  }));
  const [state, setState] = useState({
    data: {
      Id: -1,
      CustomerId: null,
      Note: '',
      SqlReport: ''
    },
    loading: false,
    shouldUpdate: false
  });
  // @TODO: wtf
  useEffect(() => {
    console.log('called effect');
    // dispatch(getOMS());
  }, []);

  const addNotes = async () => {
    const { data } = await axios.post(`${endpoints.DEV}/notes/create`, {
      'x-auth-token': token,
      Notes: state.data
    });
    if (data.message) {
      addError({
        text: data.message,
        data: 'notes.js addNotes data.message'
      });
    } else {
      // dispatch(getCustomers());
    }
  };

  const { data, loading, shouldUpdate } = state;
  const setDataParam = kv =>
    setState({ ...state, shouldUpdate: true, data: { ...data, ...kv } });
  console.log(data);
  const handleSaveButton = () => {
    addNotes();
  };
  /* if (notes.length === 0) {
    return <div className="p-5">No notes have been found</div>;
  } */
  if (!current) {
    return <div className="p-5">Nothing selected</div>;
  }
  if (loading) {
    return (
      <div className="p-5">
        <Loading />
      </div>
    );
  }
  return (
    <Container className="p-5" fluid>
      <ActionBoxContainer>
        <FontAwesomeIcon
          onClick={handleSaveButton}
          className={classNames({
            'd-none': !shouldUpdate
          })}
          color="#c3c3c3"
          size="2x"
          icon={faSave}
        />
      </ActionBoxContainer>
      <MainItemRow className="justify-content-center">
        <Col xl={5} className="mx-3">
          <Row>
            <Labby>Note</Labby>
          </Row>
          <Row>
            <Areay
              value={data.Note}
              onChange={e => setDataParam({ Note: e.target.value })}
              className="w-100"
              rows="15"
            />
          </Row>
        </Col>
        <Col xl={5} className="mx-3">
          <Row>
            <Labby>SQL Report</Labby>
          </Row>
          <Row>
            <Areay
              value={data.SqlReport}
              onChange={e => setDataParam({ SqlReport: e.target.value })}
              className="w-100"
              rows="15"
            />
          </Row>
        </Col>
      </MainItemRow>
    </Container>
  );
};

export default NotesTab;
