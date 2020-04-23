import React from 'react';
import styled from 'styled-components';
import { Container, Col, Dropdown, Row, Tab, Tabs } from 'react-bootstrap';

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
const ItemRow = styled(Row)`
  &&& * {
    width: 100%;
  }
`;
const FormInput = styled.input`
  &&& {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
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
const FormDropdown = styled(Dropdown)`
  &&& .dropdown-toggle {
    border: 1px solid #ced4da;
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
  }
`;

const DashboardTabs = props => {
  return (
    <MainContainer fluid>
      <MainTab id="Extra" defaultActiveKey="1">
        <Tab eventKey="1" title="Company">
          <Container className="p-5" fluid>
            <MainItemRow className="justify-content-start">
              <Col xl={3} className="mx-3">
                <ItemRow>
                  <Labby>Industry</Labby>
                </ItemRow>
                <ItemRow>
                  <FormDropdown>
                    <Dropdown.Toggle variant="Secondary" id="dropdown-scopes">
                      Manufacturing
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">Manufacturing</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Oil / Gas</Dropdown.Item>
                      <Dropdown.Item eventKey="3">
                        Medical / Pharma
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="4">Education</Dropdown.Item>
                      <Dropdown.Item eventKey="5">Marketing</Dropdown.Item>
                      <Dropdown.Item eventKey="6">Agriculture</Dropdown.Item>
                    </Dropdown.Menu>
                  </FormDropdown>
                </ItemRow>
              </Col>
              <Col xl={2} className="mx-3">
                <ItemRow>
                  <Labby>HR System</Labby>
                </ItemRow>
                <ItemRow>
                  <FormInput placeholder="HR System" />
                </ItemRow>
              </Col>
              <Col xl={4} className="mx-3">
                <ItemRow>
                  <Col>
                    <ItemRow>
                      <Labby>Fiscal Year Begin</Labby>
                    </ItemRow>
                    <ItemRow>
                      <FormInput placeholder="Fiscal Year Begin" />
                    </ItemRow>
                  </Col>
                  <Col>
                    <ItemRow>
                      <Labby>Fiscal Year End</Labby>
                    </ItemRow>
                    <ItemRow>
                      <FormInput placeholder="Fiscal Year End" />
                    </ItemRow>
                  </Col>
                </ItemRow>
              </Col>
              <Col xl={2} className="mx-3">
                <ItemRow>
                  <Labby>Permission</Labby>
                </ItemRow>
                <ItemRow>
                  <FormDropdown>
                    <Dropdown.Toggle variant="Secondary" id="dropdown-scopes">
                      PLEB
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="PLEB">PLEB</Dropdown.Item>
                      <Dropdown.Item eventKey="PLEB">SUB</Dropdown.Item>
                      <Dropdown.Item eventKey="PLEB">ADMIN</Dropdown.Item>
                    </Dropdown.Menu>
                  </FormDropdown>
                </ItemRow>
              </Col>
            </MainItemRow>
            <MainItemRow className="justify-content-start">
              <Col xl={3} className="mx-3">
                <ItemRow>
                  <Labby>Timezone</Labby>
                </ItemRow>
                <ItemRow>
                  <FormDropdown>
                    <Dropdown.Toggle variant="Secondary" id="dropdown-scopes">
                      Eastern
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">Eastern</Dropdown.Item>
                      <Dropdown.Item eventKey="2">American Samoa</Dropdown.Item>
                      <Dropdown.Item eventKey="3">Hawaii</Dropdown.Item>
                      <Dropdown.Item eventKey="4">Alaska</Dropdown.Item>
                      <Dropdown.Item eventKey="5">
                        Pacific Time zone
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="6">Guam</Dropdown.Item>
                    </Dropdown.Menu>
                  </FormDropdown>
                </ItemRow>
              </Col>
              <Col xl={2} className="mx-3">
                <ItemRow>
                  <Labby>Financial Platform</Labby>
                </ItemRow>
                <ItemRow>
                  <FormInput placeholder="Financial Platform" />
                </ItemRow>
              </Col>
              <Col xl={4} className="mx-3">
                <ItemRow>
                  <Col>
                    <ItemRow>
                      <Labby>Month End Close Period</Labby>
                    </ItemRow>
                    <ItemRow>
                      <FormInput placeholder="Month End Close Period" />
                    </ItemRow>
                  </Col>
                  <Col>
                    <ItemRow>
                      <Labby>Quarterly Close Cycle</Labby>
                    </ItemRow>
                    <ItemRow>
                      <FormInput placeholder="Quarterly Close Cycle" />
                    </ItemRow>
                  </Col>
                </ItemRow>
              </Col>
              <Col xl={2} className="mx-3">
                <ItemRow>
                  <Labby>No. Employees</Labby>
                </ItemRow>
                <ItemRow>
                  <FormInput placeholder="69" />
                </ItemRow>
              </Col>
            </MainItemRow>
          </Container>
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
        <Tab eventKey="9" title="Footprint">
          9
        </Tab>
      </MainTab>
    </MainContainer>
  );
};

export default DashboardTabs;
