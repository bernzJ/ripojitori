import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import { FixedSizeList as List, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const renderItems = React.memo(({ data, index, style }) => {
  const { users, selected, setSelected } = data;
  const user = users[index];
  const HandleItemClick = () => {
    if (selected.indexOf(user._id) > -1) {
      setSelected([...selected.filter(s => s !== user._id)]);
    } else {
      setSelected([...selected, user._id]);
    }
  };
  return (
    <div style={style}>
      <RowItem
        className={classNames({
          row: true,
          selected: selected.indexOf(user._id) > -1
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
  const [selected, setSelected] = React.useState([]);
  if (items.length === 0) {
    return <span>Nothing to see here.</span>;
  }
  return (
    <VHContainer>
      <div className="pl-thead">
        <div className="row">
          <div className="col">ID</div>
          <div className="col">Email</div>
          <div className="col">First Name</div>
          <div className="col">Last Name</div>
          <div className="col">Permission</div>
        </div>
      </div>
      <div className="pl-tbody h-100">
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              itemData={{
                users: items,
                selected,
                setSelected
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
  .col {
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pl-thead {
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
