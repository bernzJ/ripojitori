import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Dropdown, Container, Col, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { customer } from '../constants';
import { addCustomer, setCurrent } from '../actions/customers';
import { addIndustry } from '../actions/industries';
import { addTimezone } from '../actions/timezones';

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
const SaveIconContainer = styled.div`
  &&& {
    position: absolute;
    right: 50px;
    padding: 12px;
    cursor: pointer;
  }
`;

const buildSelectDefaultValues = (
  values,
  select = { value: 'Name', label: 'Name' }
) => {
  if (!values) {
    return [];
  }
  return values.reduce((acc, cur) => {
    acc.push({ value: cur[select.value], label: cur[select.label] });
    return acc;
  }, []);
};

const CoreTab = props => {
  const { indLoading, industries, timezones, current } = useSelector(state => ({
    industries: state.industriesReducer.industries,
    indLoading: state.industriesReducer.loading,
    timezones: state.timezonesReducer.timezones,
    current: state.customersReducer.current
  }));

  const [state, setState] = React.useState({
    data: customer,
    shouldUpdate: false,
    industriesDefaultValues: [],
    timezonesDefaultValues: []
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (current) {
      setState({
        ...state,
        data: current,
        industriesDefaultValues: buildSelectDefaultValues(industries, {
          value: 'Id',
          label: 'Name'
        }),
        timezonesDefaultValues: buildSelectDefaultValues(timezones, {
          value: 'Id',
          label: 'Name'
        })
      });
    }
  }, [current, industries, timezones]);

  const {
    data,
    industriesDefaultValues,
    timezonesDefaultValues,
    shouldUpdate
  } = state;
  if (!data.Id) {
    return <div>Nothing selected</div>;
  }
  const setDataParam = kv =>
    setState({ ...state, shouldUpdate: true, data: { ...data, ...kv } });

  console.log(data, industriesDefaultValues);

  // Click handlers
  const handleSaveButton = () => {
    dispatch(addCustomer(state.data));
  };

  // @NOTE: this is iffy.
  const handleIndSelectCreate = Name => {
    dispatch(setCurrent(state.data));
    dispatch(addIndustry({ Name }));
  };
  // @NOTE: add if needed
  // eslint-disable-next-line no-unused-vars
  const handleTzSelectCreate = Name => {
    dispatch(setCurrent(state.data));
    dispatch(addTimezone({ Name }));
  };

  const handleIndSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        data: { ...data, IndustryId: null },
        shouldUpdate: true
      });
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        data: {
          ...data,
          IndustryId: newValue.value,
          IndustryName: newValue.label
        },
        shouldUpdate: true
      });
    }
  };

  const handleTzSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        data: { ...data, TimezoneId: null },
        shouldUpdate: true
      });
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        data: {
          ...data,
          TimezoneId: newValue.value,
          TimezoneName: newValue.label
        },
        shouldUpdate: true
      });
    }
  };
  return (
    <Container className="p-5" fluid>
      <SaveIconContainer
        className={classNames({
          'd-none': !shouldUpdate
        })}
        onClick={handleSaveButton}
      >
        <FontAwesomeIcon color="#757575" size="3x" icon={faSave} />
      </SaveIconContainer>
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
                industriesDefaultValues.find(
                  i => i.value === data.IndustryId
                ) || ''
              }
              isLoading={indLoading}
              onCreateOption={handleIndSelectCreate}
              onChange={(newItem, actionMeta) =>
                handleIndSelectChange(newItem, actionMeta)
              }
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
                timezonesDefaultValues.find(i => i.value === data.TimezoneId) ||
                ''
              }
              onChange={(newItem, actionMeta) =>
                handleTzSelectChange(newItem, actionMeta)
              }
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
