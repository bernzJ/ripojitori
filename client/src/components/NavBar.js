import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { routes } from '../constants';

const NavBar = props => {
  const {
    location: { pathname }
  } = props;
  const userScope = useSelector(
    ({
      authReducer: {
        user: { scope }
      }
    }) => scope
  );
  if (pathname === routes.LOGIN) {
    return null;
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Ripojitori</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Linky
              className={classNames({
                selected: pathname === routes.DASHBOARD
              })}
              to={routes.DASHBOARD}
            >
              Dashboard
            </Linky>
          </Nav>
          {userScope ? (
            <Nav>
              <Linky
                className={classNames({
                  selected: pathname === routes.ADMIN
                })}
                to={routes.ADMIN}
              >
                Admin
              </Linky>
            </Nav>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);

const Linky = styled(Link)`
  &&& {
    padding: 15px;
    text-decoration: none;
    color: #c3c3c3;
    transition: color 0.2s linear;
  }
  &&&.selected {
    color: #fff;
  }
`;
