/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import VirtualTable from './VirtualTable';
import ClientsDetailsTabs from './ClientsDetailsTabs';
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

/* const dynamicRenderHeaders = items => {
  const item = items[0];
  if (item) {
    return Object.keys(item).map(k => <th key={k}>{k}</th>);
  }
  return null;
}; */

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index }) => {
  const { companies, dispatch, currentId, prevent, setUnsaved } = data;
  const company = companies[index];
  const HandleItemClick = () => {
    if (!prevent || window.confirm('Unsaved changes, are you sure?')) {
      setUnsaved(false);
      dispatch(setCurrent(company));
    }
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
      <td data-title="Country">{company.CountryName}</td>
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

const ClientsDetailsTable = ({ items, mapId }) => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.customersReducer.current);
  const [unsaved, setUnsaved] = useState(false);
  /* if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  } */

  return (
    <VHContainer fluid className="h-100">
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
                prevent: unsaved,
                setUnsaved,
                currentId: current ? current.Id : -1
              }}
              itemCount={items.length}
              itemSize={checkBreakpoint()}
            />
          )}
        </AutoSizer>
      </MainTableContainer>
      <ClientsDetailsTabs
        unsaved={prevent => setUnsaved(prevent)}
        mapId={mapId}
      />
    </VHContainer>
  );
};

ClientsDetailsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ClientsDetailsTable;
