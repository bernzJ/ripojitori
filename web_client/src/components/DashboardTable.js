/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { actionsBox, scopes } from '../constants';
import AddEditDelCustomer from './AddEditDelCustomer';
import VirtualTable from './VirtualTable';
import DashboardTabs from './DashboardTabs';
import { setCurrent } from '../actions/customers';

const MainTableContainer = styled.div`
  @media only screen and (max-width: 1100px) {
    &&& table,
    &&& thead,
    &&& tbody,
    &&& th,
    &&& td,
    &&& tr {
      display: block;
    }

    &&& thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    &&& tr {
      border: 1px solid #ccc;
      height: 1028px;
    }

    &&& td {
      border: none;
      border-bottom: 1px solid #f8f8f8;
      position: relative;
      padding-left: 50%;
      white-space: nowrap;
      text-align: left;
    }

    &&& td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      color: #00355c;
      font-weight: 600;
      text-transform: uppercase;
    }
    &&& td:before {
      content: attr(data-title);
    }
  }
`;
const VHContainer = styled(Container)`
  &&& {
    position: relative;
    height: 350px;
    padding: 0;
    margin-top: 15px;
  }
`;
const RowItem = styled.tr`
  &:first-of-type {
    border-top: 3px solid #f8f8f8;
  }
  & {
    cursor: default;
    transition: all 0.2s linear;
    border-bottom: 3px solid #f8f8f8;
    background-color: #fff;
    white-space: nowrap;
    height: 63px;
  }
  &&&.selected {
    background-color: #0e5181;
    color: #fff;
  }
  &&&:hover {
    background-color: #14639c;
    color: #fff;
  }
  & td {
    padding: 15px 20px;
  }
`;
const PLHead = styled.tr`
  &&& {
    margin-bottom: 20px;
  }
  &&& th {
    position: relative;
    color: #00355c;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 11px;
    margin-top: 10px;
    background-color: #fff;
    padding: 0 20px;
  }
`;
const ActionBox = styled.div`
  &&& {
    z-index: 9;
    position: absolute;
    right: 0;
    top: -70px;
    margin: 10px;
  }
`;
const ButtonAction = styled(Button)`
  &&& {
    margin-left: 5px;
    margin-right: 5px;
    color: #fff;
    background-color: #4898cf;
    border: none;
  }
`;

/* const dynamicRenderHeaders = items => {
  const item = items[0];
  if (item) {
    return Object.keys(item).map(k => <th key={k}>{k}</th>);
  }
  return null;
}; */

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index }) => {
  const { companies, dispatch, currentId } = data;
  const company = companies[index];
  const HandleItemClick = () => {
    dispatch(setCurrent(company));
  };
  return (
    <RowItem
      className={classNames({
        selected: currentId === company.Id
      })}
      key={company.Id}
      onClick={HandleItemClick}
    >
      <td data-title="Id">{company.Id}</td>
      <td data-title="Name">{company.Name}</td>
      <td data-title="Country">{company.Country}</td>
      <td data-title="LGOwner">{company.LGOwner}</td>
      <td data-title="OMSType">{company.OMSType}</td>
      <td data-title="ActiveProjects">
        {company.ActiveProjects ? 'True' : 'False'}
      </td>
    </RowItem>
  );
}, areEqual);

const checkBreakpoint = () => {
  const { innerWidth: width } = window;
  return width <= 1100 ? 1028 : 63;
};

const DashboardTable = ({ items }) => {
  const [state, setState] = React.useState({
    action: {
      name: actionsBox.NONE,
      visibility: false,
      toggle: null,
      params: {}
    }
  });
  const dispatch = useDispatch();
  const { user, current } = useSelector(state => ({
    user: state.authReducer.user,
    current: state.customersReducer.current
  }));
  /* if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  } */
  const { action } = state;
  const setVisibility = visibility =>
    setState({ ...state, action: { ...action, visibility } });
  const renderModals = () =>
    action.name === actionsBox.NONE ? null : <AddEditDelCustomer {...action} />;

  const renderButtons = () => {
    if (user.Scope === scopes.SUB) {
      return (
        <Row className="px-0 m-0">
          <ButtonAction
            onClick={() =>
              setState({
                ...state,
                action: {
                  mode: actionsBox.CREATE,
                  visibility: true,
                  toggle: setVisibility
                }
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </ButtonAction>
          <ButtonAction
            onClick={() => {
              if (current) {
                setState({
                  ...state,
                  action: {
                    mode: actionsBox.EDIT,
                    visibility: true,
                    toggle: setVisibility,
                    params: {
                      current
                    }
                  }
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </ButtonAction>
        </Row>
      );
    }
    if (user.Scope === scopes.ADMIN) {
      return (
        <Row className="px-0 m-0">
          <ButtonAction
            onClick={() =>
              setState({
                ...state,
                action: {
                  mode: actionsBox.CREATE,
                  visibility: true,
                  toggle: setVisibility
                }
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </ButtonAction>
          <ButtonAction
            onClick={() => {
              if (current) {
                setState({
                  ...state,
                  action: {
                    mode: actionsBox.EDIT,
                    visibility: true,
                    toggle: setVisibility,
                    params: {
                      current
                    }
                  }
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </ButtonAction>
          <ButtonAction
            onClick={() => {
              if (current) {
                setState({
                  ...state,
                  action: {
                    mode: actionsBox.DELETE,
                    visibility: true,
                    toggle: setVisibility,
                    params: {
                      current,
                      title: 'Are you sure ?',
                      message: 'Deleting selected customer is permanent.'
                    }
                  }
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </ButtonAction>
        </Row>
      );
    }
    return <Row className="px-0 m-0" />;
  };

  return (
    <VHContainer fluid className="h-100">
      {renderModals()}
      <MainTableContainer className="h-100">
        <ActionBox>{renderButtons()}</ActionBox>
        <AutoSizer>
          {({ height, width }) => (
            <VirtualTable
              width={width}
              height={height}
              header={
                <thead>
                  <PLHead>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Country</th>
                    <th>LG Owner</th>
                    <th>OMS Service Type</th>
                    <th>Active Projects</th>
                  </PLHead>
                </thead>
              }
              row={renderItems}
              itemData={{
                companies: items,
                dispatch,
                currentId: current ? current.Id : -1
              }}
              itemCount={items.length}
              itemSize={checkBreakpoint()}
            />
          )}
        </AutoSizer>
      </MainTableContainer>
      <DashboardTabs />
    </VHContainer>
  );
};

DashboardTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DashboardTable;
