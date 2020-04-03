/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FixedSizeList as List, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { actionsBox, scopes } from '../constants';
import AddEditDelCompany from './AddEditDelCompany';

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index, style }) => {
  const {
    companies,
    state,
    setState,
    state: { selected }
  } = data;
  const company = companies[index];
  const HandleItemClick = () => {
    if (selected.indexOf(company) > -1) {
      setState({
        ...state,
        selected: [...selected.filter(s => s._id !== company._id)]
      });
    } else {
      setState({ ...state, selected: [...selected, company] });
    }
  };
  return (
    <div style={style}>
      <RowItem
        className={classNames({
          row: true,
          selected: selected.indexOf(company) > -1
        })}
        key={company._id}
        onClick={HandleItemClick}
      >
        <div className="col">{company.clientName}</div>
        <div className="col">{company.segment}</div>
        <div className="col">{company.category}</div>
        <div className="col">{company.hours}</div>
        <div className="col">{company.status}</div>
        <div className="col">{company.start}</div>
        <div className="col">{company.end}</div>
        <div className="col">{company.projectResource}</div>
      </RowItem>
    </div>
  );
}, areEqual);

const DashboardTable = ({ items }) => {
  const [state, setState] = React.useState({
    selected: [],
    action: {
      name: actionsBox.NONE,
      visibility: false,
      toggle: null,
      params: {}
    }
  });
  const { user } = useSelector(({ authReducer: user }) => user);

  if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  }
  const { action } = state;
  const setVisibility = visibility =>
    setState({ ...state, action: { ...action, visibility } });
  const renderModals = () =>
    action.name === actionsBox.NONE ? null : <AddEditDelCompany {...action} />;

  const renderButtons = () => {
    if (user.scope === scopes.SUB) {
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
            <FontAwesomeIcon icon={faEdit} />
          </ButtonAction>
        </Row>
      );
    }
    if (user.scope === scopes.ADMIN) {
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
            <FontAwesomeIcon icon={faEdit} />
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
                      message: 'Deleting selected companies is permanent.'
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
    <VHContainer fluid>
      {renderModals()}
      <div className="pl-thead">
        <ActionBox>{renderButtons()}</ActionBox>
        <div className="row mr-10">
          <div className="col">Client Name</div>
          <div className="col">Segment</div>
          <div className="col">Category</div>
          <div className="col">Hours</div>
          <div className="col">Status</div>
          <div className="col">Start</div>
          <div className="col">End</div>
          <div className="col">Project resource</div>
        </div>
      </div>
      <div className="pl-tbody h-100 mr-10">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              itemData={{
                companies: items,
                state,
                setState
              }}
              itemCount={items.length}
              itemSize={62}
            >
              {renderItems}
            </List>
          )}
        </AutoSizer>
      </div>
    </VHContainer>
  );
};

export default DashboardTable;

DashboardTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

const VHContainer = styled(Container)`
  &&& {
    height: calc(100vh - 70px);
    padding: 0;
  }
  .row {
    margin: 5px 0;
    padding: 0 20px;
    -webkit-box-align: center;
    align-items: center;
  }
  &&& .mr-10 {
    margin-right: 120px;
  }
  .col {
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pl-thead {
    position: relative;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 11px;
    margin-top: 10px;
    padding: 15px 0;
    background-color: #343a40;
  }
  .pl-tbody .row {
    background-color: #fff;
    padding-top: 7px;
    padding-bottom: 7px;
    color: #212529;
    font-size: 16px;
  }
`;
const RowItem = styled.div`
  & {
    cursor: default;
    transition: all 0.2s linear;
  }
  &&&.selected {
    background-color: #e6e6e6;
  }
  &&&:hover {
    background-color: #343a40;
    color: #fff;
  }
`;
const ActionBox = styled.div`
  &&& {
    z-index: 9;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
  }
`;
const ButtonAction = styled(Button)`
  &&& {
    margin-left: 5px;
    margin-right: 5px;
    color: #fff;
    background-color: #343a40;
  }
`;
