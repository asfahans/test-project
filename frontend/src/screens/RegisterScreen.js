import React, { useState, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('Capt.');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('Technical Department');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const [loadVessels, setLoadVessels] = useState([
    { name: 'TW' },
    { name: 'TS' },
    { name: 'TP' },
  ]);

  const [assignedVessels, setAssignedVessels] = useState([]);

  const handleToggle = (v) => () => {
    const currentVessel = assignedVessels.indexOf(v);
    const newCheckedVessel = [...assignedVessels];

    if (currentVessel === -1) {
      newCheckedVessel.push(v);
    } else {
      newCheckedVessel.splice(currentVessel, 1);
    }
    setAssignedVessels(newCheckedVessel);
  };

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        register(
          username,
          password,
          title,
          name,
          designation,
          department,
          assignedVessels,
          isAdmin
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            as='select'
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
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            placeholder='Enter Designation'
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='department'>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as='select'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value='Technical Department'>Technical Department</option>
            <option value='Commercial Department'>Commercial Department</option>
            <option value='Crewing Department'>Crewing Department</option>
            <option value='IT Department'>IT Department</option>
            <option value='Onboard'>Onboard</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='isAdmin'>
          <Form.Check
            type='checkbox'
            label='Is Admin'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>

        {loadVessels.map((loadVessel, i) => (
          <Form.Group controlId={loadVessel.name} key={i}>
            <Form.Check
              onChange={handleToggle(loadVessel)}
              value={assignedVessels.indexOf(loadVessel.name === -1)}
              type='checkbox'
              label={loadVessel.name}
            ></Form.Check>
          </Form.Group>
        ))}

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
