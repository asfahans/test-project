import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUser } from '../actions/userActions';
import { listVessels } from '../actions/vesselActions';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
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
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const vesselList = useSelector((state) => state.vesselList);
  const { vessels } = vesselList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'USER_UPDATE_RESET' });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
        dispatch(listVessels());
      } else {
        setTitle(user.title);
        setName(user.name);
        setDesignation(user.designation);
        setDepartment(user.department);
        setIsAdmin(user.isAdmin);
        setIsActive(user.isActive);
        setAssignedVessels(user.assignedVessels);
      }
    }
  }, [user, dispatch, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      title === '' &&
      name === '' &&
      designation === '' &&
      department === '' &&
      assignedVessels.length <= 0
    ) {
      setMessage({
        title: 'Title is required',
        name: 'Name is required',
        designation: 'Designation is required',
        department: 'Department is required',
        assignedVessels: 'Atleast 1 vessel is required to be assigned',
      });
    } else if (title === '') {
      setMessage({
        title: 'Title is required',
      });
    } else if (name === '') {
      setMessage({
        name: 'Name is required',
      });
    } else if (password !== confirmPassword) {
      setMessage({
        confirmPassword: 'Passwords do not match',
      });
    } else if (designation === '') {
      setMessage({
        designation: 'Designation is required',
      });
    } else if (department === '') {
      setMessage({
        department: 'Department is required',
      });
    } else if (assignedVessels.length <= 0) {
      setMessage({
        assignedVessels: 'Atleast 1 vessel is required to be assigned',
      });
    } else {
      dispatch(
        updateUser({
          _id: userId,
          title,
          name,
          password,
          designation,
          department,
          isAdmin,
          isActive,
          assignedVessels,
        })
      );
    }
  };

  const selectedVessels =
    vessels &&
    vessels.filter(
      ({ name: id1 }) =>
        !user.assignedVessels.some(({ name: id2 }) => id2 === id1)
    );

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
              <div className='invalid-feedback'>{message.title}</div>
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
              <div className='invalid-feedback'>{message.name}</div>
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
              <div className='invalid-feedback'>{message.password}</div>
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
              <div className='invalid-feedback'>{message.confirmPassword}</div>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='switch'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isActive'>
              <Form.Check
                type='switch'
                label='Is Active'
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='designation'>
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                placeholder='Enter Designation'
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className={message.designation && `is-invalid`}
              ></Form.Control>
              <div className='invalid-feedback'>{message.designation}</div>
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
                <option value='Technical Department'>
                  Technical Department
                </option>
                <option value='Commercial Department'>
                  Commercial Department
                </option>
                <option value='Crewing Department'>Crewing Department</option>
                <option value='IT Department'>IT Department</option>
                <option value='Onboard'>Onboard</option>
              </Form.Control>
              <div className='invalid-feedback'>{message.department}</div>
            </Form.Group>

            <Col style={{ columns: '3 auto', padding: '0' }}>
              {user.assignedVessels &&
                user.assignedVessels.map((assigned1Vessel) => (
                  <Form.Group
                    controlId={assigned1Vessel.name}
                    key={assigned1Vessel.name}
                  >
                    <Form.Check
                      type='switch'
                      label={assigned1Vessel.name}
                      value={assignedVessels.indexOf(
                        assigned1Vessel.name === -1
                      )}
                      onChange={handleToggle(assigned1Vessel)}
                      style={{
                        backgroundColor: '#92bdfd',
                        borderRadius: '10px',
                      }}
                    ></Form.Check>
                  </Form.Group>
                ))}
              <div className='invalid-feedback'>{message.assignedVessels}</div>
            </Col>

            <Col style={{ columns: '3 auto' }} className='p-0 mb-4'>
              {selectedVessels &&
                selectedVessels.map((selectedVessel) => (
                  <Form.Group
                    controlId={selectedVessel.name}
                    key={selectedVessel.name}
                  >
                    <Form.Check
                      onChange={handleToggle(selectedVessel)}
                      value={selectedVessels.indexOf(
                        selectedVessel.name === -1
                      )}
                      type='switch'
                      label={selectedVessel.name}
                      className={message.assignedVessels && `is-invalid`}
                    ></Form.Check>
                  </Form.Group>
                ))}
            </Col>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
