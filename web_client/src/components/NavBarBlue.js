import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { routes, scopes, api } from '../constants';
import { useApi } from '../actions/useApi';
import { logout } from '../actions/auth';

const NavWrapper = styled.div`
  &&& #main-nav {
    padding: 0;
    background-color: #00355c;
  }
  &&& .linky {
    padding: 15px;
    text-decoration: none;
    color: #c3c3c3;
    transition: color 0.2s linear;
  }
  &&& .linky.selected {
    color: #fff;
  }
  &&& .linka {
    padding: 15px;
    text-decoration: none;
    color: #c3c3c3;
    transition: color 0.2s linear;
  }
  &&& .linka.selected {
    color: #fff;
  }
  &&& .title {
    user-select: none;
    color: #fff;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  &&& .logo-container {
    height: 62px;
    background-color: #4898cf;
  }
`;

const NavBarBlue = props => {
  const {
    location: { pathname }
  } = props;
  const dispatch = useDispatch();
  const userScope = useSelector(state => state.authReducer.user.Scope);
  const [state, doFetch] = useApi();
  if (pathname === routes.LOGIN) {
    return null;
  }
  return (
    <NavWrapper>
      <Navbar id="main-nav" collapseOnSelect expand="lg">
        <div className="p-3 logo-container">
          <label className="navbar-brand title">Client Database</label>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              className={classNames({
                linky: true,
                selected: pathname === routes.DASHBOARD
              })}
              to={routes.DASHBOARD}
            >
              Dashboard
            </Link>
            <Link
              className={classNames({
                linky: true,
                selected: pathname === routes.CLIENTS
              })}
              to={routes.CLIENTS}
            >
              Clients Details
            </Link>
            {userScope === scopes.ADMIN ? (
              <Link
                className={classNames({
                  linky: true,
                  selected: pathname === routes.ADMIN
                })}
                to={routes.ADMIN}
              >
                Admin
              </Link>
            ) : null}
          </Nav>
          <a
            onClick={() => {
              doFetch({ initialUrl: api.auth.logout });
              dispatch(logout());
            }}
            className={classNames({
              linka: true,
              selected: pathname === routes.LOGIN
            })}
            href="#"
          >
            Logout
          </a>
        </Navbar.Collapse>
      </Navbar>
    </NavWrapper>
  );
};

export default withRouter(NavBarBlue);
