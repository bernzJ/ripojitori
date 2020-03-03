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
import { FixedSizeList as List, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import ConfirmModal from './ConfirmModal';
import AddEditUserModal from './AddEditUserModal';

// @TODO: memo this might be useless.
const renderItems = React.memo(({ data, index, style }) => {
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
    <div style={style}>
      <RowItem
        className={classNames({
          row: true,
          selected: selected.indexOf(user) > -1
        })}
        key={user._id}
        onClick={HandleItemClick}
      >
        <div className="col">{user._id}</div>
        <div className="col">{user.email}</div>
        <div className="col">{user.firstName}</div>
        <div className="col">{user.lastName}</div>
        <div className="col">{user.scope}</div>
      </RowItem>
    </div>
  );
}, areEqual);

const VirtualizedList = ({ items }) => {
  const [state, setState] = React.useState({
    selected: [],
    confirmModal: false,
    cEModal: false
  });

  if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  }

  const renderModals = () => {
    if (state.cEModal) {
      return (
        <AddEditUserModal
          show={state.cEModal}
          hide={() => setState({ ...state, cEModal: false })}
          selectedUser={state.selected.length > 0 ? state.selected[0] : {}}
        />
      );
    }
    return null;
  };

  return (
    <VHContainer>
      {renderModals()}
      <div className="pl-thead">
        <ActionBox>
          <Row className="px-0 m-0">
            <ButtonAction onClick={() => setState({ ...state, cEModal: true })}>
              <FontAwesomeIcon icon={faUserPlus} />
            </ButtonAction>
            <ButtonAction>
              <FontAwesomeIcon icon={faUserEdit} />
            </ButtonAction>
            <ButtonAction>
              <FontAwesomeIcon icon={faUserTimes} />
            </ButtonAction>
          </Row>
        </ActionBox>
        <div className="row mr-10">
          <div className="col">ID</div>
          <div className="col">Email</div>
          <div className="col">First Name</div>
          <div className="col">Last Name</div>
          <div className="col">Permission</div>
        </div>
      </div>
      <div className="pl-tbody h-100 mr-10">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              itemData={{
                users: items,
                state,
                setState
              }}
              itemCount={items.length}
              itemSize={38}
            >
              {renderItems}
            </List>
          )}
        </AutoSizer>
      </div>
    </VHContainer>
  );
};

export default VirtualizedList;

VirtualizedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

const VHContainer = styled(Container)`
  &&& {
    height: calc(100vh - 70px);
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
