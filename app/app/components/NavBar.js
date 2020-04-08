import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { routes, scopes } from '../constants';
import { apiLogout } from '../actions/auth';

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
    <NavWrapper>
      <Navbar collapseOnSelect expand="lg">
        <LogoContainer className="p-3">
          <Title className="navbar-brand">Client Database</Title>
        </LogoContainer>
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
          <LinkA
            onClick={() => {
              dispatch(apiLogout());
            }}
            className={classNames({
              selected: pathname === routes.LOGIN
            })}
            href="#"
          >
            Logout
          </LinkA>
        </Navbar.Collapse>
      </Navbar>
    </NavWrapper>
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
const LinkA = styled.a`
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
const NavWrapper = styled.div`
  &&& .navbar-collapse {
    padding: 0;
    background-color: #00355c;
  }
`;
const Title = styled.label`
  &&& {
    user-select: none;
    color: #fff;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
`;
const LogoContainer = styled.div`
  &&& {
    height: 62px;
    background-color: #4898cf;
  }
`;
