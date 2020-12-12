import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { motion } from 'framer-motion';
import { register } from '../actions/userActions';
import { listVessels } from '../actions/vesselActions';

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAssistant, setIsAssistant] = useState(false);
  const [assignedVessels, setAssignedVessels] = useState([]);
  const [message, setMessage] = useState({
    title: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    designation: '',
    department: '',
    assignedVessels: [],
    message: null,
  });

  const handleToggle = (v) => () => {
    const currentVessel = assignedVessels.indexOf(v);
    const newCheckedVessel = [...assignedVessels];

    if (currentVessel === -1) {
      newCheckedVessel.push(v);
    } else {
      newCheckedVessel.splice(currentVessel, 1);
    }
    setAssignedVessels(newCheckedVessel);
    console.log(assignedVessels);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const vesselList = useSelector((state) => state.vesselList);
  const { vessels } = vesselList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listVessels());
    } else {
      history.push('/');
    }
  }, [userInfo, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title === '' &&
      name === '' &&
      username === '' &&
      password === '' &&
      confirmPassword === '' &&
      designation === '' &&
      department === '' &&
      assignedVessels.length <= 0
    ) {
      setMessage({
        title: 'Title is required',
        name: 'Name is required',
        username: 'Username is required',
        password: 'Password is required',
        confirmPassword: 'Confirm password is required',
        designation: 'Designation is required',
        department: 'Department is required',
        assignedVessels: 'Atleast 1 vessel is required to be assigned',
      });
      setShake(5);
    } else if (title === '') {
      setMessage({
        title: 'Title is required',
      });
      setShake(5);
    } else if (name === '') {
      setMessage({
        name: 'Name is required',
      });
      setShake(5);
    } else if (username === '') {
      setMessage({
        username: 'Username is required',
      });
      setShake(5);
    } else if (password === '') {
      setMessage({
        password: 'Password is required',
      });
      setShake(5);
    } else if (confirmPassword === '') {
      setMessage({
        confirmPassword: 'Confirm password is required',
      });
      setShake(5);
    } else if (password.length < 6) {
      setMessage({
        password: 'Password should be atleast 6 characters',
      });
      setShake(5);
    } else if (password !== confirmPassword) {
      setMessage({
        confirmPassword: 'Passwords do not match',
      });
      setShake(5);
    } else if (designation === '') {
      setMessage({
        designation: 'Designation is required',
      });
      setShake(5);
    } else if (department === '') {
      setMessage({
        department: 'Department is required',
      });
      setShake(5);
    } else if (assignedVessels.length <= 0) {
      setMessage({
        assignedVessels: 'Atleast 1 vessel is required to be assigned',
      });
      setShake(5);
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
          isAdmin,
          isAssistant
        )
      );

      setMessage({ message: 'User created!' });
      setTitle('');
      setName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setIsAdmin(false);
      setIsAssistant(false);
      setDesignation('');
      setDepartment('');
      setAssignedVessels([]);
      dispatch({ type: 'USER_LIST_RESET' });
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
        <h4 className='mb-3'>Register a user</h4>
        {message.message && <Message variant='info'>{message.message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              as='select'
              custom
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={message.title && `is-invalid`}
            >
              <option value=''>Choose title</option>
              <option value='Capt.'>Capt.</option>
              <option value='Mr.'>Mr.</option>
              <option value='Ms.'>Ms.</option>
              <option value='Mrs.'>Mrs.</option>
            </Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.title}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={message.name && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.name}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Enter username'
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
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={message.password && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.password}
            </motion.div>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={message.confirmPassword && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.confirmPassword}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Form.Group controlId='isAssistant'>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Is Assistant'
              checked={isAssistant}
              onChange={(e) => setIsAssistant(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Form.Group controlId='designation'>
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Enter designation'
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className={message.designation && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.designation}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='department'>
            <Form.Label>Department</Form.Label>
            <Form.Control
              as='select'
              custom
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={message.department && `is-invalid`}
            >
              <option value=''>Choose department</option>
              <option value='Technical Department'>Technical Department</option>
              <option value='Commercial Department'>
                Commercial Department
              </option>
              <option value='Crewing Department'>Crewing Department</option>
              <option value='IT Department'>IT Department</option>
              <option value='Onboard'>Onboard</option>
            </Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.department}
            </motion.div>
          </Form.Group>

          <p>Assign vessel(s)</p>
          <Col style={{ columns: '3 auto', padding: '0' }}>
            {vessels &&
              vessels.map((vessel) => (
                <Form.Group controlId={vessel.name} key={vessel._id}>
                  <Form.Check
                    onChange={handleToggle(vessel)}
                    value={assignedVessels.indexOf(vessel.name === -1)}
                    type='switch'
                    label={vessel.name}
                    className={message.assignedVessels && `is-invalid`}
                  ></Form.Check>
                </Form.Group>
              ))}
          </Col>
          <motion.div animate={errorVariants} className='text-danger mt-1'>
            <small>{message.assignedVessels && message.assignedVessels}</small>
          </motion.div>
          <br />
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
      </FormContainer>
    </motion.div>
  );
};

export default RegisterScreen;
