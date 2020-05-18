import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, Tab, Tabs } from 'react-bootstrap';

import CoreTab from './CoreTab';
import NotesTab from './NotesTab';

const MainContainer = styled(Container)`
  &&& {
    background: #f8f8f8;
    padding: 20px;
  }
`;
const MainTab = styled(Tabs)`
  &&& {
    border: none;
  }
  &&& a.active {
    border: none;
    border-radius: 58px;
    background-color: #4898cf;
    color: #fff;
  }
  &&& a:hover,
  &&& a:focus {
    border: none;
    outline: 0;
  }
  &&& a {
    text-transform: uppercase;
    border: none;
    color: #c3c3c3;
    font-weight: 600;
    font-size: 14px;
    margin: auto;
    padding-right: 30px;
    padding-left: 30px;
  }
`;
// @TODO: implement this differently so all apis arent called at the same time.
const ClientsDetailsTabs = ({ unsaved }) => {
  return (
    <MainContainer fluid>
      <MainTab id="Extra" defaultActiveKey="1">
        <Tab eventKey="1" title="Company">
          <CoreTab unsaved={unsaved} />
        </Tab>
        <Tab eventKey="2" title="Products">
          2
        </Tab>
        <Tab eventKey="4" title="TMCs">
          4
        </Tab>
        <Tab eventKey="5" title="Card">
          5
        </Tab>
        <Tab eventKey="6" title="Pay">
          6
        </Tab>
        <Tab eventKey="7" title="Contacts">
          7
        </Tab>
        <Tab eventKey="8" title="Compliance">
          8
        </Tab>
        <Tab eventKey="9" title="Notes">
          <NotesTab unsaved={unsaved} />
        </Tab>
      </MainTab>
    </MainContainer>
  );
};

ClientsDetailsTabs.propTypes = {
  unsaved: PropTypes.func.isRequired
};

export default ClientsDetailsTabs;
