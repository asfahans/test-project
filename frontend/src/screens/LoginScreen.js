import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { motion } from 'framer-motion';

const LoginScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ username: '', password: '' });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/homescreen';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (username === '' && password === '') {
      setMessage({
        username: 'Username is required',
        password: 'Password is required',
      });
      setShake(5);
    } else if (username === '') {
      setMessage({ username: 'Username is required' });
      setShake(5);
    } else if (password === '') {
      setMessage({ password: 'Password is required' });
      setShake(5);
    } else if (password.length < 3) {
      setMessage({ password: 'Invalid password criteria' });
      setShake(5);
    } else {
      // Dispatch Login
      dispatch(login(username, password));
      setMessage({ username: '', password: '' });
    }
  };

  /* Animation */
  const [shake, setShake] = useState(0);
  const errorVariants = {
    x: shake,
    transition: { yoyo: 3, duration: 0.1 },
  };
  /*END: Animation */
  return (
    <motion.div
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <FormContainer>
        <h4 className='mb-3'>Login</h4>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler} noValidate>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder="Enter your username as 'foo'"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={message.username && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.username}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder="Enter your password as 'bar'"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={message.password && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.password}
            </motion.div>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Login
          </Button>
        </Form>
      </FormContainer>
    </motion.div>
  );
};

export default LoginScreen;
