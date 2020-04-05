import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { routes, scopes } from '../constants';
import { apiLogout } from '../actions/auth';
import { saveToken } from '../actions/alias/token';

const NavBar = props => {
  const {
    location: { pathname }
  } = props;
  const dispatch = useDispatch();
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
      <Navbar.Brand href="#home">Client Database</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Linky
            className={classNames({
              selected: pathname === routes.DASHBOARD
            })}
            to={routes.DASHBOARD}
          >
            Dashboard
          </Linky>
          {userScope === scopes.ADMIN ? (
            <Linky
              className={classNames({
                selected: pathname === routes.ADMIN
              })}
              to={routes.ADMIN}
            >
              Admin
            </Linky>
          ) : null}
        </Nav>
        <Linky
          onClick={() => {
            dispatch(apiLogout());
            dispatch(saveToken(''));
          }}
          className={classNames({
            selected: pathname === routes.LOGIN
          })}
          to={routes.LOGIN}
        >
          Logout
        </Linky>
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
