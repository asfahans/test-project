import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const CreateTicketScreen = ({ location, history }) => {
  const [toDesignation, setToDesignation] = useState('');
  const [toDepartment, setToDepartment] = useState('');
  const [fromTitle, setFromTitle] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromDesignation, setFromDesignation] = useState('');
  const [fromDepartment, setFromDepartment] = useState(false);
  const [vessel, setVessel] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo.assignedVessels);

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  useEffect(() => {
    // if (userInfo) {
    //   history.push(redirect);
    // }
    setFromTitle(userInfo.title);
    setFromDesignation(userInfo.designation);
    setFromDepartment(userInfo.department);
  }, [userInfo]);

  console.log(fromTitle);
  console.log(fromDesignation);
  console.log(fromDepartment);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Create Ticket</h1>
      {/* {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}

      <Form onSubmit={submitHandler}>
        {userInfo.department === 'Onboard' ? (
          <Form.Group controlId='toDepartment'>
            <Form.Label>To Department</Form.Label>
            <Form.Control
              as='select'
              value={toDepartment}
              onChange={(e) => setToDepartment(e.target.value)}
            >
              <option value='Technical'>Technical</option>
              <option value='Crew'>Crew</option>
              <option value='Commercial'>Commercial</option>
              <option value='IT Support'>IT Support</option>
            </Form.Control>
          </Form.Group>
        ) : (
          <>
            <Form.Group controlId='toDepartment'>
              <Form.Label>Vessel</Form.Label>
              <Form.Control
                as='select'
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
              >
                <option value='The Able'>The Able</option>
                <option value='The Wise'>The Wise</option>
                <option value='The Guardian'>The Guardian</option>
                <option value='The Eternal'>The Eternal</option>
                <option value='The Holy'>The Holy</option>
                <option value='The Loving'>The Loving</option>
                <option value='The Strong'>The Strong</option>
                <option value='The Living'>The Living</option>
                <option value='The Patron'>The Patron</option>
                <option value='The Merciful'>The Merciful</option>
                <option value='The Unity'>The Unity</option>
                <option value='The Giver'>The Giver</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='toDesignation'>
              <Form.Label>To Designation</Form.Label>
              <Form.Control
                as='select'
                value={toDesignation}
                onChange={(e) => setToDesignation(e.target.value)}
              >
                <option value='Master'>Master</option>
                <option value='Chief Engineer'>Chief Engineer</option>
              </Form.Control>
            </Form.Group>
          </>
        )}

        <Form.Group controlId='summary'>
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type='text'
            placeholder='Summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='isImportant'>
          <Form.Check
            type='checkbox'
            label='Treat this email as High Priority'
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          ></Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateTicketScreen;
