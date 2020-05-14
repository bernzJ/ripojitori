/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { intScopeToString } from '../constants';
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

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index }) => {
  const { users, state, setState } = data;
  const user = users[index];
  const HandleItemClick = () => {
    setState({ ...state, selected: user });
  };
  return (
    <RowItem
      className={classNames({
        selected: user.Id === (state.selected ? state.selected.Id : -1)
      })}
      key={user.Id}
      onClick={HandleItemClick}
    >
      <td data-title="ID">{user.Id}</td>
      <td data-title="Email">{user.Email}</td>
      <td data-title="First Name">{user.FirstName}</td>
      <td data-title="Last Name">{user.LastName}</td>
      <td data-title="Permission">{intScopeToString(user.Scope)}</td>
    </RowItem>
  );
}, areEqual);

const checkBreakpoint = () => {
  const { innerWidth: width } = window;
  return width <= 1100 ? 442 : 78;
};

const AdminTable = ({ items }) => {
  const [state, setState] = useState({
    selected: null
  });

  /* if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  } */

  return (
    <VHContainer fluid>
      <MainTableContainer className="h-100">
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
