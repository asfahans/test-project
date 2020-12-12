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
              <img
                src='/img/SNP-Logo.png'
                alt='SNP Shipping Services Pvt. Ltd.'
                className='img-responsive logo mr-3'
              />
              <strong style={{ color: '#00509d' }}>SNP Service Desk</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {userInfo && (
              <Nav className='mr-auto'>
                <LinkContainer to='/dashboard'>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/create'>
                  <Nav.Link>Create</Nav.Link>
                </LinkContainer>
              </Nav>
            )}

            <Nav className='ml-auto'>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' alignRight>
                  <LinkContainer to='/register'>
                    <NavDropdown.Item>
                      <i
                        className='fas fa-user-plus'
                        style={{ marginRight: '4px' }}
                      ></i>{' '}
                      Register
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      <i
                        className='fas fa-users'
                        style={{ marginRight: '4px' }}
                      ></i>{' '}
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/ticketlist'>
                    <NavDropdown.Item>
                      <i
                        className='fas fa-ticket-alt'
                        style={{ marginRight: '4px' }}
                      ></i>{' '}
                      Tickets
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && (
                <NavDropdown
                  title={userInfo.title + ' ' + userInfo.name}
                  id='username'
                  alignRight
                >
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
