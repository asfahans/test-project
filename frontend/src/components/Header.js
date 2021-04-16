import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/' className='mr-4'>
            <Navbar.Brand>
              <strong style={{ color: '#125fa9' }} className='ml-3'>
                Test Project
              </strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className='mr-3'>
            <Nav className='ml-auto'>
              {userInfo && (
                <NavDropdown
                  title={userInfo.title + ' ' + userInfo.name}
                  id='username'
                  alignRight
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className='fas fa-sign-out-alt'></i> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
