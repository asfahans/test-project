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
          <LinkContainer to='/'>
            <Navbar.Brand>
              <strong>SNP Service Desk</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/dashboard'>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/create'>
                <Nav.Link>Create</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className='ml-auto'>
              {userInfo && (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i
                        className='fas fa-user'
                        style={{ marginRight: '4px' }}
                      ></i>{' '}
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
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
