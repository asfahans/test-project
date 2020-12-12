import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import SearchBox from '../components/SearchBox';
import { motion } from 'framer-motion';

const UserListScreen = ({ history, match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(keyword));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successDelete, keyword]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <Row>
        <Col className='d-flex align-items-end'>
          <h3 className='mb-2'>All users</h3>
        </Col>
        <Col md={3} className='d-flex justify-content-end pb-2'>
          <SearchBox history={history} url='admin/userlist' />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <Row>
                <Table hover responsive className='table-md'>
                  <thead>
                    <tr>
                      <th width='20'>#</th>
                      <th width='150'>Username</th>
                      <th width='250'>Name</th>
                      <th width='200'>Designation</th>
                      <th width='200'>Department</th>
                      <th width='90' style={{ textAlign: 'center' }}>
                        Is Active
                      </th>
                      <th width='90' style={{ textAlign: 'center' }}>
                        Is Admin
                      </th>
                      <th>Assigned Vessels</th>
                      <th width='100'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={user._id}>
                        <td>{i + 1}.</td>
                        <td>{user.username}</td>
                        <td>
                          {user.title} {user.name}
                        </td>
                        <td>{user.designation}</td>
                        <td>{user.department}</td>
                        <td style={{ textAlign: 'center' }}>
                          {user.isActive ? (
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {user.isAdmin ? (
                            <i
                              className='fas fa-check'
                              style={{ color: 'green' }}
                            ></i>
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {user.assignedVessels.map((vessels) => (
                            <span key={vessels._id}>{vessels.name}, </span>
                          ))}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(user._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </motion.div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserListScreen;
