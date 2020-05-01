import React from 'react';
import styled from 'styled-components';
import { Dropdown, Container, Col, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useSelector } from 'react-redux';

import { customer } from '../constants';

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
  &&& {
    width: 100%;
  }
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
    width: 100%;
  }
`;
const CreatableSelectCustom = styled(CreatableSelect)`
  &&& {
    width: 100%;
  }
`;

const buildSelectDefaultValues = values => {
  if (!values) {
    return [];
  }
  return values.reduce((acc, cur) => {
    acc.push({ value: cur.Name, label: cur.Name });
    return acc;
  }, []);
};

const CoreTab = ({ selected }) => {
  // @TODO: create core table constant
  const { industries, timezones } = useSelector(state => ({
    industries: state.industriesReducer.industries,
    timezones: state.timezonesReducer.timezones
  }));
  const [state, setState] = React.useState({
    data: customer,
    industriesDefaultValues: [],
    timezonesDefaultValues: []
  });

  React.useEffect(() => {
    if (selected) {
      setState({
        data: selected,
        industriesDefaultValues: buildSelectDefaultValues(industries),
        timezonesDefaultValues: buildSelectDefaultValues(timezones)
      });
    }
  }, [selected, buildSelectDefaultValues, industries, timezones]);

  const { data, industriesDefaultValues, timezonesDefaultValues } = state;
  if (!data.Id) {
    return <div>Nothing selected</div>;
  }

  const setDataParam = kv => setState({ ...state, data: { ...data, ...kv } });
  const handleIndSelectChange = newValue => {
    if (newValue) {
      setState({
        ...state,
        data: { ...data, Industry: newValue.value },
        industriesDefaultValues: newValue.__isNew__
          ? [...industriesDefaultValues, newValue]
          : industriesDefaultValues
      });
    }
  };
  const handleTzSelectChange = newValue => {
    if (newValue) {
      setState({
        ...state,
        data: { ...data, Timezone: newValue.value },
        timezonesDefaultValues: newValue.__isNew__
          ? [...timezonesDefaultValues, newValue]
          : timezonesDefaultValues
      });
    }
  };
  return (
    <Container className="p-5" fluid>
      <MainItemRow className="justify-content-start">
        <Col xl={3} className="mx-3">
          <Row>
            <Labby>Industry</Labby>
          </Row>
          <Row>
            <CreatableSelectCustom
              classNamePrefix="react-select"
              isClearable
              value={
                industriesDefaultValues.find(i => i.value === data.Industry) ||
                ''
              }
              onChange={newItem => handleIndSelectChange(newItem)}
              options={industriesDefaultValues}
            />
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>HR System</Labby>
          </Row>
          <Row>
            <FormInput
              className="w-100"
              placeholder="HR System"
              value={data.HRSystem || ''}
              onChange={e => setDataParam({ HRSystem: e.target.value })}
            />
          </Row>
        </Col>
        <Col xl={4} className="mx-3">
          <Row>
            <Col className="mr-3">
              <Row>
                <Labby>Fiscal Year Begin</Labby>
              </Row>
              <Row>
                <FormInput
                  className="w-100"
                  placeholder="Fiscal Year Begin"
                  value={data.FiscalYearBegin || ''}
                  onChange={e =>
                    setDataParam({ FiscalYearBegin: e.target.value })
                  }
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>Fiscal Year End</Labby>
              </Row>
              <Row>
                <FormInput
                  className="w-100"
                  placeholder="Fiscal Year End"
                  value={data.FiscalYearEnd || ''}
                  onChange={e =>
                    setDataParam({ FiscalYearEnd: e.target.value })
                  }
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>Permission</Labby>
          </Row>
          <Row>
            <FormDropdown>
              <Dropdown.Toggle
                variant="Secondary"
                id="dropdown-scopes"
                className="w-100"
              >
                PLEB
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="PLEB">PLEB</Dropdown.Item>
                <Dropdown.Item eventKey="PLEB">SUB</Dropdown.Item>
                <Dropdown.Item eventKey="PLEB">ADMIN</Dropdown.Item>
              </Dropdown.Menu>
            </FormDropdown>
          </Row>
        </Col>
      </MainItemRow>
      <MainItemRow className="justify-content-start">
        <Col xl={3} className="mx-3">
          <Row>
            <Labby>Timezone</Labby>
          </Row>
          <Row>
            <Select
              isClearable
              className="w-100"
              value={
                timezonesDefaultValues.find(i => i.value === data.Timezone) ||
                ''
              }
              onChange={newItem => handleTzSelectChange(newItem)}
              options={timezonesDefaultValues}
            />
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>Financial Platform</Labby>
          </Row>
          <Row>
            <FormInput
              placeholder="Financial Platform"
              className="w-100"
              value={data.FinancialPlatform || ''}
              onChange={e =>
                setDataParam({ FinancialPlatform: e.target.value })
              }
            />
          </Row>
        </Col>
        <Col xl={4} className="mx-3">
          <Row>
            <Col className="mr-3">
              <Row>
                <Labby>Month End Close Period</Labby>
              </Row>
              <Row>
                <FormInput
                  placeholder="Month End Close Period"
                  className="w-100"
                  value={data.MonthEndClosePeriod || ''}
                  onChange={e =>
                    setDataParam({ MonthEndClosePeriod: e.target.value })
                  }
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>Quarterly Close Cycle</Labby>
              </Row>
              <Row>
                <FormInput
                  placeholder="Quarterly Close Cycle"
                  className="w-100"
                  value={data.QuarterlyCloseCycle || ''}
                  onChange={e =>
                    setDataParam({ QuarterlyCloseCycle: e.target.value })
                  }
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>No. Employees</Labby>
          </Row>
          <Row>
            <FormInput
              placeholder="69"
              className="w-100"
              value={data.EmployeesCount}
              onChange={e => setDataParam({ EmployeesCount: e.target.value })}
            />
          </Row>
        </Col>
      </MainItemRow>
    </Container>
  );
};

export default CoreTab;
