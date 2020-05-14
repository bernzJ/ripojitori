import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row } from 'react-bootstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { routes } from '../constants';
import dotSVG from '../assets/svg/dot.svg';
import dotShadow from '../assets/svg/dotshadow.svg';

const Mappy = styled(Map)`
  &&& {
    height: 400px;
    width: 100%;
  }
`;
const dotIcon = new L.Icon({
  iconUrl: dotSVG,
  iconRetinaUrl: dotSVG,
  iconAnchor: [14, 14],
  popupAnchor: [185, 105],
  iconSize: [28, 28],
  shadowUrl: dotShadow,
  shadowSize: [28, 28],
  shadowAnchor: [14, 14]
});

const Poppy = styled(Popup)`
  &&& {
    width: 305px;
    height: 179px;
  }
  &&& .leaflet-popup-content-wrapper {
    background-color: #435061;
    border: none;
    border-radius: 3px;
  }
  &&& .leaflet-popup-tip-container {
    left: 0;
    top: 42%;
    width: auto;
    height: auto;
    margin-left: -10px;
  }
  &&& .leaflet-popup-tip {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    transform: none;
    background-color: transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #435061;
  }
`;
const PopupHeader = styled(Row)`
  &&& {
    border-bottom: 1px solid #607183;
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;
const PopupFooter = styled(Row)`
  &&& {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const TitleLabel = styled.label`
  &&& {
    font-family: 'Montserrat';
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
  }
`;
const PopupLabel = styled.label`
  &&& {
    font-family: 'Montserrat';
    color: #d5e2f3;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
  }
`;
const PopupField = styled.label`
  &&& {
    font-family: 'Montserrat';
    color: #96a9c7;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
  }
`;
const ButtonAction = styled(Link)`
  &&& {
    margin-left: 5px;
    margin-right: 5px;
    color: #fff;
    background-color: #4898cf;
    border: none;
    width: 100%;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  &&&:hover,
  &&&:focus {
    text-decoration: none;
    background-color: #55b3f4;
  }
`;
const StatsBoxContainer = styled(Row)`
  &&& {
    margin-left: 5%;
    text-align: center;
  }
`;
const Stats = styled(Row)`
  &&& {
    border-right: solid 1px #e6e8e7;
    padding-right: 20px;
    padding-left: 20px;
  }
`;
const StatsLabelTop = styled.label`
  &&& {
    color: #80889b;
    font-size: 41px;
    font-weight: 300;
    margin: 0;
  }
`;
const StatsLabelBot = styled.label`
  &&& {
    color: #80889b;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const Dashboard = props => {
  return (
    <Container fluid>
      <StatsBoxContainer>
        <Stats>
          <Col lg="12">
            <StatsLabelTop>219</StatsLabelTop>
          </Col>
          <Col lg="12">
            <StatsLabelBot>Total clients</StatsLabelBot>
          </Col>
        </Stats>
        <Stats>
          <Col lg="12">
            <StatsLabelTop>43</StatsLabelTop>
          </Col>
          <Col lg="12">
            <StatsLabelBot>Total active clients</StatsLabelBot>
          </Col>
        </Stats>
        <Stats>
          <Col lg="12">
            <StatsLabelTop>143</StatsLabelTop>
          </Col>
          <Col lg="12">
            <StatsLabelBot>Total active projects</StatsLabelBot>
          </Col>
        </Stats>
      </StatsBoxContainer>
      <Row>
        <Mappy
          center={[51.505, -0.09]}
          zoom={3}
          zoomControl={false}
          maxZoom={20}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          <Marker icon={dotIcon} position={[51.505, -0.09]}>
            <Poppy>
              <Container fluid>
                <PopupHeader>
                  <TitleLabel>Snap, Inc.</TitleLabel>
                </PopupHeader>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Address</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>5550 Newbury Street</PopupField>
                  </Col>
                </Row>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Active</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>Yes</PopupField>
                  </Col>
                </Row>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Oms type</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>None</PopupField>
                  </Col>
                </Row>
                <PopupFooter>
                  <Col>
                    <ButtonAction to={routes.CLIENTS}>
                      See Details <FontAwesomeIcon icon={faArrowRight} />
                    </ButtonAction>
                  </Col>
                </PopupFooter>
              </Container>
            </Poppy>
          </Marker>
          <Marker icon={dotIcon} position={[45.505, -0.09]}>
            <Poppy>
              <Container fluid>
                <PopupHeader>
                  <TitleLabel>Ecosystem Investment Partners (EIP)</TitleLabel>
                </PopupHeader>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Address</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>5550 Newbury Street</PopupField>
                  </Col>
                </Row>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Active</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>Yes</PopupField>
                  </Col>
                </Row>
                <Row>
                  <Col lg="5">
                    <PopupLabel>Oms type</PopupLabel>
                  </Col>
                  <Col lg="7">
                    <PopupField>Project</PopupField>
                  </Col>
                </Row>
                <PopupFooter>
                  <Col>
                    <ButtonAction to={routes.CLIENTS}>
                      See Details <FontAwesomeIcon icon={faArrowRight} />
                    </ButtonAction>
                  </Col>
                </PopupFooter>
              </Container>
            </Poppy>
          </Marker>
        </Mappy>
      </Row>
    </Container>
  );
};

export default Dashboard;
