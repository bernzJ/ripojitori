/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import { Container, Col, FormCheck, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import Joi from '@hapi/joi';
import { addError, addSuccess } from 'redux-flash-messages';
import L from 'leaflet';

import { customer, api } from '../constants';
import { setCurrent, addCustomer, setCurrentById } from '../actions/customers';

const Daty = styled(DatePicker)`
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
const ActionBoxContainer = styled.div`
  &&& {
    position: absolute;
    right: 50px;
    padding: 16px;
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

const buildStatesByCID = (s, cid) =>
  !cid ? s : s.filter(_s => _s.CountryId === cid);

const CoreTab = ({ unsaved, mapId }) => {
  const { current, token } = useSelector(state => ({
    current: state.customersReducer.current,
    token: state.authReducer.user.token
  }));
  const dispatch = useDispatch();

  // const [{ data: apiData, isLoading, isError }, doFetch] = useApi();

  const [state, setState] = useState({
    data: customer,
    shouldUpdate: false,
    industriesDefaultValues: [],
    timezonesDefaultValues: [],
    countriesDefaultValues: [],
    OMSDefaultValues: [],
    statesDefaultValues: [],
    states: []
  });

  useEffect(() => {
    if (mapId !== undefined) {
      dispatch(setCurrentById(mapId));
    }
  }, [mapId]);

  const {
    data,
    industriesDefaultValues,
    timezonesDefaultValues,
    countriesDefaultValues,
    OMSDefaultValues,
    statesDefaultValues,
    shouldUpdate
  } = state;

  // @NOTE: reason for statesDefaultValues in dependencies; as its the last one set (presumably), it use the [state] object it got before.
  // test this, if true, solution is either that or flatten state.
  useEffect(() => {
    if (current && data.Id !== current.Id) {
      setState({
        ...state,
        data: current
      });
    }
  }, [current, statesDefaultValues]);

  // @NOTE: should update doesn't do any comparison. so this returns true everytime a field is changed.
  useEffect(() => {
    unsaved(shouldUpdate);
    if (shouldUpdate) {
      window.onbeforeunload = () => 'Unsaved changes, are you sure?';
    } else {
      window.onbeforeunload = undefined;
    }
  }, [shouldUpdate]);

  const fetchIndustries = async () => {
    try {
      const {
        data: { industries }
      } = await axios.post(api.industries.get, {
        'x-auth-token': token
      });
      return {
        industriesDefaultValues: buildSelectDefaultValues(industries, {
          value: 'Id',
          label: 'Name'
        })
      };
    } catch ({ message, response }) {
      addError({
        text: response ? response.data : message
      });
    }
  };
  const calcGeo = customer => {
    const { City } = customer;
    const { CountryName, StateName } = data;
    const addy = `${City}${StateName ? `, ${StateName}` : ''}, ${CountryName}`;
    const geocoder = L.Control.Geocoder.nominatim();
    return new Promise(resolve =>
      geocoder.geocode(addy, r =>
        resolve(
          r.length > 0 ? JSON.stringify(r[0].center) : '{"lat":0,"lng":0}'
        )
      )
    );
  };
  const addCustomerApi = async customer => {
    try {
      const AddressLngLat = customer.AddressLngLat
        ? customer.AddressLngLat
        : await calcGeo(customer);
      const {
        data: { result, message }
      } = await axios.post(api.customers.create, {
        'x-auth-token': token,
        customer: { ...customer, AddressLngLat }
      });
      if (result) {
        // dispatch(setCurrent({ ...data }));
        dispatch(addCustomer(data));
        setState({ ...state, shouldUpdate: false });
        addSuccess({ text: 'Saved !' });
      } else {
        addError({ text: message, data: 'fetchUpdate' });
      }
    } catch ({ message, response }) {
      addError({
        text: response ? response.data : message
      });
    }
  };

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      try {
        const { industriesDefaultValues: dv } = await fetchIndustries();
        const {
          data: { timezones }
        } = await axios.post(api.timezones.get, {
          'x-auth-token': token
        });
        const {
          data: { countries }
        } = await axios.post(api.countries.get, {
          'x-auth-token': token
        });
        const {
          data: { oms }
        } = await axios.post(api.OMS.get, {
          'x-auth-token': token
        });
        const {
          data: { states }
        } = await axios.post(api.states.get, {
          'x-auth-token': token
        });
        if (!didCancel) {
          setState({
            ...state,
            states,
            industriesDefaultValues: dv,
            timezonesDefaultValues: buildSelectDefaultValues(timezones, {
              value: 'Id',
              label: 'Name'
            }),
            countriesDefaultValues: buildSelectDefaultValues(countries, {
              value: 'Id',
              label: 'CountryName'
            }),
            OMSDefaultValues: buildSelectDefaultValues(oms, {
              value: 'Id',
              label: 'Type'
            }),
            statesDefaultValues: buildSelectDefaultValues(states, {
              value: 'Id',
              label: 'Name'
            })
          });
        }
      } catch ({ message, response }) {
        if (!didCancel) {
          addError({
            text: response ? response.data : message
          });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [token]);

  useEffect(() => {
    if (data.CountryId > 0) {
      setState({
        ...state,
        statesDefaultValues: buildSelectDefaultValues(
          buildStatesByCID(state.states, data.CountryId),
          { value: 'Id', label: 'Name' }
        )
      });
    }
  }, [data.CountryId]);

  const formatDate = sqlDate =>
    typeof sqlDate === 'string'
      ? new Date(sqlDate.replace(/-/g, '/'))
      : sqlDate;
  const setDataParam = kv =>
    setState({ ...state, shouldUpdate: true, data: { ...data, ...kv } });

  // Click handlers
  const handleSaveButton = () => {
    // return console.log(data);
    const schema = Joi.object({
      Id: Joi.number().default(-1),
      Name: Joi.string()
        .max(150)
        .required(),
      Website: Joi.string().max(255),
      Industry: Joi.number().required(),
      Timezone: Joi.number().required(),
      FiscalYearId: Joi.number().default(-1),
      FiscalYearBegin: Joi.date(),
      FiscalYearEnd: Joi.date(),
      FiscalYearMonthEndClosePeriod: Joi.date(),
      FiscalYearQuarterlyCloseCycle: Joi.date(),
      EmployeesCount: Joi.number().default(0),
      OMS: Joi.number().required(),
      ActiveProjects: Joi.boolean().default(false),
      FinancialId: Joi.number().default(-1),
      FinancialPlatform: Joi.string().max(50),
      HRId: Joi.number().default(-1),
      HRSystem: Joi.string().max(50),
      SSO: Joi.boolean().default(false),
      TestSite: Joi.boolean().default(false),
      RefreshDate: Joi.date(),
      Logo: Joi.any(),
      Address1: Joi.string()
        .max(255)
        .required(),
      Address2: Joi.string().max(255),
      City: Joi.string()
        .max(255)
        .required(),
      Zip: Joi.string().max(50),
      Country: Joi.number().default(1),
      State: Joi.number().default(71),
      LGOwner: Joi.string().max(50),
      EmployeeGroupsId: Joi.number().default(-1),
      AddressLngLat: Joi.string().max(150),
      EmployeeGroupsName: Joi.string().max(50)
    });

    const customerSchema = schema.validate(
      {
        ...data,
        Timezone: data.TimezoneId,
        Industry: data.IndustryId,
        Country: data.CountryId,
        State: data.StateId,
        OMS: data.OMSId
      },
      { stripUnknown: true }
    );
    if (customerSchema.error) {
      const {
        error: { details }
      } = customerSchema;
      addError({
        text: details[0].message,
        data: 'CoreTab.js handleSaveButton companySchema.error'
      });
    } else {
      // calc geo pos and add it
      addCustomerApi(customerSchema.value);
      // dispatch(addCustomer(customerSchema.value));
    }
  };

  const handleIndSelectCreate = Name => {
    const fetchUpdate = async () => {
      try {
        const {
          data: { result, message }
        } = await axios.post(api.industries.create, {
          'x-auth-token': token,
          Industry: { Name }
        });
        if (result) {
          const { industriesDefaultValues: newVal } = await fetchIndustries();
          setState({
            ...state,
            industriesDefaultValues: newVal
          });
        } else {
          addError({ text: message, data: 'fetchUpdate' });
        }
      } catch ({ message, response }) {
        addError({
          text: response ? response.data : message
        });
      }
    };
    fetchUpdate();
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

  const handleCnSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        data: { ...data, CountryId: null },
        shouldUpdate: true
      });
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        data: {
          ...data,
          CountryId: newValue.value,
          CountryName: newValue.label
        },
        shouldUpdate: true
      });
    }
  };

  const handleStSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        data: { ...data, StateId: null },
        shouldUpdate: true
      });
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        data: {
          ...data,
          StateId: newValue.value,
          StateName: newValue.label
        },
        shouldUpdate: true
      });
    }
  };

  const handleOMSSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'clear') {
      setState({
        ...state,
        data: { ...data, OMSId: null },
        shouldUpdate: true
      });
    }
    if (actionMeta.action === 'select-option') {
      setState({
        ...state,
        data: {
          ...data,
          OMSId: newValue.value,
          OMSType: newValue.label
        },
        shouldUpdate: true
      });
    }
  };
  return (
    <Container className="p-5" fluid>
      <Prompt when={shouldUpdate} message="Unsaved changes, are you sure?" />
      <ActionBoxContainer>
        <FontAwesomeIcon
          onClick={() => {
            if (
              !shouldUpdate ||
              window.confirm('Unsaved changes, are you sure?')
            ) {
              dispatch(setCurrent({}));
            }
          }}
          className="mr-3"
          color="#c3c3c3"
          size="2x"
          icon={faPlus}
        />
        <FontAwesomeIcon
          className={classNames({
            'd-none': !shouldUpdate
          })}
          onClick={handleSaveButton}
          color="#c3c3c3"
          size="2x"
          icon={faSave}
        />
      </ActionBoxContainer>
      <MainItemRow className="justify-content-start">
        <Col xl={3} className="mx-3">
          <Row>
            <Labby>Company Name</Labby>
          </Row>
          <Row>
            <FormInput
              className="w-100"
              placeholder="Company Name"
              value={data.Name || ''}
              onChange={e => setDataParam({ Name: e.target.value })}
            />
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>Website</Labby>
          </Row>
          <Row>
            <FormInput
              className="w-100"
              placeholder="Website"
              value={data.Website || ''}
              onChange={e => setDataParam({ Website: e.target.value })}
            />
          </Row>
        </Col>
        <Col xl={4} className="mx-3">
          <Row>
            <Col className="mr-3">
              <Row>
                <Labby>LG Owner</Labby>
              </Row>
              <Row>
                <FormInput
                  className="w-100"
                  placeholder="LG Owner"
                  value={data.LGOwner || ''}
                  onChange={e => setDataParam({ LGOwner: e.target.value })}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>OMS</Labby>
              </Row>
              <Row>
                <Select
                  isClearable
                  className="w-100"
                  value={
                    OMSDefaultValues.find(i => i.value === data.OMSId) || ''
                  }
                  onChange={(newItem, actionMeta) =>
                    handleOMSSelectChange(newItem, actionMeta)
                  }
                  options={OMSDefaultValues}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby />
          </Row>
          <Row>
            <FormCheck
              className="mt-4"
              type="switch"
              id="active-projects-switch"
              label="Active Project"
              onChange={e => setDataParam({ ActiveProjects: e.target.checked })}
              checked={data.ActiveProjects}
            />
          </Row>
        </Col>
      </MainItemRow>
      <MainItemRow className="justify-content-start">
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>Country</Labby>
          </Row>
          <Row>
            <Select
              isClearable
              className="w-100"
              value={
                countriesDefaultValues.find(i => i.value === data.CountryId) ||
                ''
              }
              onChange={(newItem, actionMeta) =>
                handleCnSelectChange(newItem, actionMeta)
              }
              options={countriesDefaultValues}
            />
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>State</Labby>
          </Row>
          <Row>
            <Select
              isClearable
              className="w-100"
              value={
                statesDefaultValues.find(i => i.value === data.StateId) || ''
              }
              onChange={(newItem, actionMeta) =>
                handleStSelectChange(newItem, actionMeta)
              }
              options={statesDefaultValues}
            />
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>City</Labby>
          </Row>
          <Row>
            <FormInput
              className="w-100"
              placeholder="City"
              value={data.City || ''}
              onChange={e => setDataParam({ City: e.target.value })}
            />
          </Row>
        </Col>
        <Col xl={3} className="mx-3">
          <Row>
            <Col className="mr-3">
              <Row>
                <Labby>Address 1</Labby>
              </Row>
              <Row>
                <FormInput
                  className="w-100"
                  placeholder="Address 1"
                  value={data.Address1 || ''}
                  onChange={e => setDataParam({ Address1: e.target.value })}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>Address 2</Labby>
              </Row>
              <Row>
                <FormInput
                  className="w-100"
                  placeholder="Address 2"
                  value={data.Address2 || ''}
                  onChange={e => setDataParam({ Address2: e.target.value })}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={1} className="mx-3">
          <Row>
            <Labby>Zip Code</Labby>
          </Row>
          <Row>
            <FormInput
              className="w-100"
              placeholder="Zip Code"
              value={data.Zip || ''}
              onChange={e => setDataParam({ Zip: e.target.value })}
            />
          </Row>
        </Col>
      </MainItemRow>
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
                <Daty
                  dateFormat="yyyy/MM/dd"
                  className="w-100"
                  selected={formatDate(data.FiscalYearBegin)}
                  onChange={FiscalYearBegin =>
                    setDataParam({ FiscalYearBegin })
                  }
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>Fiscal Year End</Labby>
              </Row>
              <Row>
                <Daty
                  dateFormat="yyyy/MM/dd"
                  className="w-100"
                  selected={formatDate(data.FiscalYearEnd)}
                  onChange={FiscalYearEnd => setDataParam({ FiscalYearEnd })}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={2} className="mx-3">
          <Row>
            <Labby>Refresh Date</Labby>
          </Row>
          <Row>
            <Daty
              dateFormat="yyyy/MM/dd"
              className="w-100"
              selected={formatDate(data.RefreshDate)}
              onChange={RefreshDate => setDataParam({ RefreshDate })}
            />
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
                <Daty
                  dateFormat="yyyy/MM/dd"
                  className="w-100"
                  selected={formatDate(data.FiscalYearMonthEndClosePeriod)}
                  onChange={FiscalYearMonthEndClosePeriod =>
                    setDataParam({
                      FiscalYearMonthEndClosePeriod
                    })
                  }
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Labby>Quarterly Close Cycle</Labby>
              </Row>
              <Row>
                <Daty
                  dateFormat="yyyy/MM/dd"
                  className="w-100"
                  selected={formatDate(data.FiscalYearQuarterlyCloseCycle)}
                  onChange={FiscalYearQuarterlyCloseCycle =>
                    setDataParam({
                      FiscalYearQuarterlyCloseCycle
                    })
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

CoreTab.propTypes = {
  unsaved: PropTypes.func.isRequired
};

export default CoreTab;
