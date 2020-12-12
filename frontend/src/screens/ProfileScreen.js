import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyTickets } from '../actions/ticketActions';
import Ticket from '../components/Ticket';
import Paginate from '../components/Paginate';
import { motion } from 'framer-motion';

const ProfileScreen = ({ location, history, match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('Capt.');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const ticketMyList = useSelector((state) => state.ticketMyList);
  const {
    loading: ticketsLoading,
    error: ticketsError,
    tickets,
    pages,
    page,
    pageSize,
    count,
  } = ticketMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setTitle(user.title);
        setName(user.name);
        setDesignation(user.designation);
      }
      dispatch(listMyTickets(keyword, pageNumber));
    }
  }, [history, userInfo, user, dispatch, keyword, pageNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          password,
          title,
          name,
          designation,
        })
      );
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Row>
      <Col md={3} className='mt-3'>
        <h4 className='mb-3'>My Profile</h4>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile updated</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              as='select'
              custom
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value='Capt.'>Capt.</option>
              <option value='Mr.'>Mr.</option>
              <option value='Ms.'>Ms.</option>
              <option value='Mrs.'>Mrs.</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='designation'>
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Enter Designation'
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <Row>
          <Col className='d-flex align-items-end pl-0'>
            <h4 className='mb-2'>
              {keyword ? 'Search results' : 'My Tickets'}
            </h4>
          </Col>
          <Col md={4} className='d-flex justify-content-end pb-2'>
            <SearchBox
              history={history}
              url='profile'
              searchKeyword={keyword}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {ticketsLoading ? (
              <Loader />
            ) : ticketsError ? (
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
                        <th width='20' className='text-center'>
                          D
                        </th>
                        <th width='140'>Ticket #.</th>
                        <th>Summary</th>
                        <th width='200'>From</th>
                        <th width='160'>Vessel</th>
                        <th width='160'>Created On</th>
                        <th width='120'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket, i) => (
                        <Ticket
                          ticket={ticket}
                          key={i}
                          i={i}
                          pageName='Profile'
                        />
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </motion.div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Paginate pages={pages} page={page} pageName='Profile' />
          </Col>
          <Col className='text-right mr-0 pr-0'>
            <h5>{count} tickets</h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
