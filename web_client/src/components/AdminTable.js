/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faUserTimes,
  faUserEdit
} from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { actionsBox, intScopeToString } from '../constants';
import AddEditDelUser from './AddEditDelUser';
import VirtualTable from './VirtualTable';

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
    }

    &&& td {
      border: none;
      border-bottom: 1px solid #f8f8f8;
      position: relative;
      padding-left: 50%;
      white-space: normal;
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
    height: 54px;
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

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index }) => {
  const {
    users,
    state,
    setState,
    state: { selected }
  } = data;
  const user = users[index];
  const HandleItemClick = () => {
    if (selected.indexOf(user) > -1) {
      setState({
        ...state,
        selected: [...selected.filter(s => s._id !== user._id)]
      });
    } else {
      setState({ ...state, selected: [...selected, user] });
    }
  };
  return (
    <RowItem
      className={classNames({
        selected: selected.indexOf(user) > -1
      })}
      key={user._id}
      onClick={HandleItemClick}
    >
      <td data-title="ID">{user._id}</td>
      <td data-title="Email">{user.email}</td>
      <td data-title="First Name">{user.firstName}</td>
      <td data-title="Last Name">{user.lastName}</td>
      <td data-title="Permission">{intScopeToString(user.scope)}</td>
    </RowItem>
  );
}, areEqual);

const checkBreakpoint = () => {
  const { innerWidth: width } = window;
  return width <= 1100 ? 442 : 78;
};

const AdminTable = ({ items }) => {
  const [state, setState] = React.useState({
    selected: [],
    action: {
      name: actionsBox.NONE,
      visibility: false,
      toggle: null,
      params: {}
    }
  });

  /* if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  } */
  const { action } = state;
  const setVisibility = visibility =>
    setState({ ...state, action: { ...action, visibility } });
  const renderModals = () =>
    action.name === actionsBox.NONE ? null : <AddEditDelUser {...action} />;

  return (
    <VHContainer fluid>
      {renderModals()}
      <MainTableContainer className="h-100">
        <ActionBox>
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
              <FontAwesomeIcon icon={faUserPlus} />
            </ButtonAction>
            <ButtonAction
              onClick={() => {
                const { selected } = state;
                if (selected.length > 0) {
                  setState({
                    ...state,
                    action: {
                      mode: actionsBox.EDIT,
                      visibility: true,
                      toggle: setVisibility,
                      params: {
                        selected: selected[0]
                      }
                    }
                  });
                }
              }}
            >
              <FontAwesomeIcon icon={faUserEdit} />
            </ButtonAction>
            <ButtonAction
              onClick={() => {
                const { selected } = state;
                if (selected.length > 0) {
                  setState({
                    ...state,
                    action: {
                      mode: actionsBox.DELETE,
                      visibility: true,
                      toggle: setVisibility,
                      params: {
                        selected,
                        title: 'Are you sure ?',
                        message: 'Deleting selected users is permanent.'
                      }
                    }
                  });
                }
              }}
            >
              <FontAwesomeIcon icon={faUserTimes} />
            </ButtonAction>
          </Row>
        </ActionBox>
        <AutoSizer>
          {({ height, width }) => (
            <VirtualTable
              width={width}
              height={height}
              header={
                <thead>
                  <PLHead>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Permission</th>
                  </PLHead>
                </thead>
              }
              row={renderItems}
              itemData={{
                users: items,
                state,
                setState
              }}
              itemCount={items.length}
              itemSize={checkBreakpoint()}
            />
          )}
        </AutoSizer>
      </MainTableContainer>
    </VHContainer>
  );
};

AdminTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AdminTable;
