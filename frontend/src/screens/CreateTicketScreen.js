import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createTicket } from '../actions/ticketActions';
//import { listVessels } from '../actions/vesselActions';
import { motion } from 'framer-motion';

const CreateTicketScreen = ({ location, history }) => {
  const descriptionLS = () => {
    if (typeof Window === 'undefined') {
      return '';
    }
    if (localStorage.getItem('description')) {
      return JSON.parse(localStorage.getItem('description'));
    } else {
      return '';
    }
  };

  const [toDesignation, setToDesignation] = useState('');
  const [toDepartment, setToDepartment] = useState('Onboard');
  const [vessel, setVessel] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState(descriptionLS());
  const [isImportant, setIsImportant] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState({
    toDesignation: '',
    toDepartment: '',
    vessel: '',
    summary: '',
    description: '',
    message: null,
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const vesselList = useSelector((state) => state.vesselList);
  // const { vessels } = vesselList;

  // const redirect = location.search
  //   ? location.search.split('=')[1]
  //   : '/dashboard';

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
    // else {
    //   dispatch(listVessels());
    // }
  }, [userInfo, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('attachment', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setAttachment(data);
      setUploading(false);
    } catch (error) {
      setMessage({
        attachment: 'Error while uploading the attachment!',
      });
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo.department === 'Onboard') {
      if (
        toDepartment === 'Onboard' &&
        summary === '' &&
        (!description || description === '<p><br></p>')
      ) {
        setMessage({
          toDepartment: 'To department is required',
          summary: 'Summary is required',
          description: 'Description is required',
        });
        setShake(5);
      } else if (toDepartment === 'Onboard') {
        setMessage({
          toDepartment: 'To department is required',
        });
        setShake(5);
      } else if (summary === '') {
        setMessage({
          summary: 'Summary is required',
        });
        setShake(5);
      } else if (!description || description === '<p><br></p>') {
        setMessage({
          description: 'Description is required',
        });
        setShake(5);
      } else {
        dispatch(
          createTicket(
            toDepartment,
            toDesignation,
            vessel,
            summary,
            description,
            isImportant,
            attachment
          )
        );
        setMessage({ message: 'Ticket created!' });
        //dispatch({ type: 'TICKET_LIST_RESET' });
        history.push('/dashboard');
      }
    } else {
      if (
        vessel === '' &&
        toDesignation === '' &&
        summary === '' &&
        (!description || description === '<p><br></p>')
      ) {
        setMessage({
          vessel: 'Vessel is required',
          toDesignation: 'Designation is required',
          summary: 'Summary is required',
          description: 'Description is required',
        });
        setShake(5);
      } else if (vessel === '') {
        setMessage({
          vessel: 'Vessel is required',
        });
        setShake(5);
      } else if (toDesignation === '') {
        setMessage({
          toDesignation: 'Designation is required',
        });
        setShake(5);
      } else if (summary === '') {
        setMessage({
          summary: 'Summary is required',
        });
        setShake(5);
      } else if (!description || description === '<p><br></p>') {
        setMessage({
          description: 'Description is required',
        });
        setShake(5);
      } else {
        dispatch(
          createTicket(
            toDepartment,
            toDesignation,
            vessel,
            summary,
            description,
            isImportant,
            attachment
          )
        );
        setMessage({ message: 'Ticket created!' });
        //dispatch({ type: 'TICKET_LIST_RESET' });
        history.push('/dashboard');
      }
    }
  };

  const handleDescription = (e) => {
    setDescription(e);
    if (typeof Window !== 'undefined') {
      localStorage.setItem('description', JSON.stringify(e));
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
        <h4 className='mb-3'>Create a ticket</h4>
        {message.message && <Message variant='info'>{message.message}</Message>}
        {/* {error && <Message variant='danger'>{error}</Message>} */}
        {/* {loading && <Loader />} */}

        <Form onSubmit={submitHandler}>
          {userInfo && userInfo.department === 'Onboard' ? (
            <Form.Group controlId='toDepartment'>
              <Form.Label>To Department</Form.Label>
              <Form.Control
                as='select'
                custom
                value={toDepartment}
                onChange={(e) => setToDepartment(e.target.value)}
                className={message.toDepartment && `is-invalid`}
              >
                <option value='Onboard'>---------------------</option>
                <option value='Technical Department'>
                  Technical Department
                </option>
                <option value='Crewing Department'>Crewing Department</option>
                <option value='Commercial Department'>
                  Commercial Department
                </option>
                <option value='IT Department'>IT Department</option>
              </Form.Control>
              <motion.div animate={errorVariants} className='invalid-feedback'>
                {message.toDepartment}
              </motion.div>
            </Form.Group>
          ) : (
            <>
              <Form.Group controlId='vessel'>
                <Form.Label>Vessel</Form.Label>
                <Form.Control
                  as='select'
                  value={vessel}
                  onChange={(e) => setVessel(e.target.value)}
                  className={message.vessel && `is-invalid`}
                >
                  <option value=''>---------------------</option>
                  {/* {vessels.map((vessel) => (
                    <option value={vessel.name} key={vessel._id}>
                      {vessel.name}
                    </option>
                  ))} */}

                  {userInfo &&
                    userInfo.assignedVessels.map((assignedVessel) => (
                      <option
                        value={assignedVessel.name}
                        key={assignedVessel._id}
                      >
                        {assignedVessel.name}
                      </option>
                    ))}
                </Form.Control>
                <motion.div
                  animate={errorVariants}
                  className='invalid-feedback'
                >
                  {message.vessel}
                </motion.div>
              </Form.Group>

              <Form.Group controlId='toDesignation'>
                <Form.Check
                  type='radio'
                  inline
                  label='Master'
                  value='Master'
                  onChange={(e) => setToDesignation(e.target.value)}
                  name='toDesignation'
                  className={message.toDesignation && `is-invalid`}
                />
                <Form.Check
                  type='radio'
                  inline
                  label='Chief Engineer'
                  value='Chief Engineer'
                  onChange={(e) => setToDesignation(e.target.value)}
                  name='toDesignation'
                  className={message.toDesignation && `is-invalid`}
                />
                <motion.div
                  animate={errorVariants}
                  className='invalid-feedback'
                >
                  {message.toDesignation}
                </motion.div>
              </Form.Group>
            </>
          )}

          <Form.Group controlId='summary'>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type='text'
              autoComplete='off'
              placeholder='Summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={message.summary && `is-invalid`}
            ></Form.Control>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.summary}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <ReactQuill
              modules={CreateTicketScreen.modules}
              formats={CreateTicketScreen.formats}
              value={String(description)}
              onChange={handleDescription}
              className={message.description && `is-invalid`}
            />
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.description}
            </motion.div>
          </Form.Group>

          <Form.Group controlId='attachment'>
            <Form.File
              id='image-file'
              label='Attachment'
              custom
              autoComplete='off'
              onChange={uploadFileHandler}
              className={message.attachment && `is-invalid`}
            ></Form.File>
            <motion.div animate={errorVariants} className='invalid-feedback'>
              {message.attachment}
            </motion.div>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='isImportant'>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Treat this email as High Priority'
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </motion.div>
  );
};

CreateTicketScreen.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

CreateTicketScreen.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
];

export default CreateTicketScreen;
