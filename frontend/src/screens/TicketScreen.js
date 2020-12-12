import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import Moment from 'react-moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser/dist/html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import {
  listTicketDetails,
  createTicketReply,
  closeTicket,
  approveTicketReply,
  disapproveTicketReply,
} from '../actions/ticketActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { motion } from 'framer-motion';

const TicketScreen = ({ match, history }) => {
  const [message, setMessage] = useState({ replyText: '' });
  const replyTextLS = () => {
    if (typeof Window === 'undefined') {
      return '';
    }
    if (localStorage.getItem('replyText')) {
      return JSON.parse(localStorage.getItem('replyText'));
    } else {
      return '';
    }
  };

  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState(replyTextLS());
  const [attachment, setAttachment] = useState('');
  const [uploading, setUploading] = useState(false);

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { loading, error, ticket } = ticketDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ticketClose = useSelector((state) => state.ticketClose);
  const { loading: loadingClose, success: successClose } = ticketClose;

  const ticketReplyApproved = useSelector((state) => state.ticketReplyApproved);
  const {
    loading: loadingApproved,
    success: successApproved,
  } = ticketReplyApproved;

  const ticketReplyDisapproved = useSelector(
    (state) => state.ticketReplyDisapproved
  );
  const {
    loading: loadingDisapproved,
    success: successDisapproved,
  } = ticketReplyDisapproved;

  const ticketReplyCreate = useSelector((state) => state.ticketReplyCreate);
  const {
    success: successTicketReply,
    error: errorTicketReply,
  } = ticketReplyCreate;

  useEffect(() => {
    dispatch(listTicketDetails(match.params.id));

    if (successTicketReply) {
      setReplyText('');
      dispatch({ type: 'TICKET_CREATE_REPLY_RESET' });
    }

    if (!userInfo) {
      history.push('/');
    }

    if (successClose) {
      dispatch({ type: 'TICKET_CLOSE_RESET' });
    }

    if (successApproved) {
      dispatch({ type: 'REPLY_APPROVED_RESET' });
    }

    if (successDisapproved) {
      dispatch({ type: 'REPLY_DISAPPROVED_RESET' });
    }
  }, [
    dispatch,
    match,
    successTicketReply,
    userInfo,
    history,
    successClose,
    successApproved,
    successDisapproved,
  ]);

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

    if (!replyText || replyText === '<p><br></p>') {
      setMessage({
        replyText: 'Reply cannot be empty',
      });
      setShake(5);
    } else {
      dispatch(createTicketReply(match.params.id, { replyText, attachment }));
      setMessage({ replyText: '' });
      setMessage({ attachment: '' });
      setAttachment('');
    }
  };

  const initialsDepartment =
    ticket.fromDepartment && ticket.fromDepartment
      ? ticket.fromDepartment &&
        ticket.fromDepartment
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 1)), '')
      : '';

  const initialsVessel =
    ticket.vessel && ticket.vessel
      ? ticket.vessel
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 1)), '')
      : '';

  const closeHandler = () => {
    dispatch(closeTicket(ticket));
  };

  const approvedHandler = (reply) => {
    if (window.confirm('Do you want to accept and send this reply?')) {
      dispatch(approveTicketReply(ticket, reply));
    }
  };

  const disapprovedHandler = (reply) => {
    if (window.confirm('Do you want to decline and delete this reply?')) {
      dispatch(disapproveTicketReply(ticket, reply));
    }
  };

  const handleReplyText = (e) => {
    setReplyText(e);
    if (typeof Window !== 'undefined') {
      localStorage.setItem('replyText', JSON.stringify(e));
    }
  };

  const overdueDate = new Date(ticket.createdAt);
  overdueDate.setDate(overdueDate.getDate() + 4);
  const currentDate = new Date();

  const ticketDate = new Date(ticket.createdAt);
  ticketDate.setDate(ticketDate.getDate() + 4);

  const replyDate = new Date(
    ticket.replies.length > 0 ? ticket.replies[0].createdAt : ''
  );

  /* Animation */
  const [shake, setShake] = useState(0);
  const errorVariants = {
    x: shake,
    transition: { yoyo: 3, duration: 0.1 },
  };
  /*END: Animation */

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <Row>
              <Col md={9}>
                <Col className='d-flex align-items-center mb-3'>
                  <Button
                    className='btn btn-light mr-3'
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                  {ticket.fromDepartment === 'Technical Department' ? (
                    <>
                      <span className='fa-stack'>
                        <i className='fas fa-square fa-stack-2x text-primary'></i>
                        <i className='fas fa-ship fa-stack-1x fa-inverse text-white'></i>
                      </span>
                      <span className='ml-1 text-primary'>
                        {ticket.fromDepartment}
                      </span>
                    </>
                  ) : ticket.fromDepartment === 'IT Department' ? (
                    <>
                      <span className='fa-stack'>
                        <i className='fas fa-square fa-stack-2x text-success'></i>
                        <i className='fas fa-desktop fa-stack-1x fa-inverse text-white'></i>
                      </span>
                      <span className='ml-1 text-success'>
                        {ticket.fromDepartment}
                      </span>
                    </>
                  ) : ticket.fromDepartment === 'Crewing Department' ? (
                    <>
                      <span className='fa-stack'>
                        <i className='fas fa-square fa-stack-2x text-info'></i>
                        <i className='fas fa-user fa-stack-1x fa-inverse text-white'></i>
                      </span>
                      <span className='ml-1 text-primary'>
                        {ticket.fromDepartment}
                      </span>
                    </>
                  ) : ticket.fromDepartment === 'Onboard' ? (
                    <>
                      <span className='fa-stack'>
                        <i className='fas fa-square fa-stack-2x text-danger'></i>
                        <i className='fas fa-user fa-stack-1x fa-inverse text-white'></i>
                      </span>
                      <span className='ml-1 text-danger'>
                        {ticket.fromDepartment}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className='fa-stack'>
                        <i className='fas fa-square fa-stack-2x text-warning'></i>
                        <i
                          className='fas fa-coins fa-stack-1x fa-inverse text-white'
                          style={{ color: '#FFFFFF' }}
                        ></i>
                      </span>
                      <span className='ml-1 text-warning'>
                        {ticket.fromDepartment}
                      </span>
                    </>
                  )}

                  <div
                    className='ml-5 d-flex align-items-center p-1 pr-2 rounded'
                    style={{ backgroundColor: '#eee' }}
                  >
                    <span className='fa-stack'>
                      <i className='fas fa-square fa-stack-2x'></i>
                      <i
                        className='fas fa-ticket-alt fa-stack-1x fa-inverse text-white'
                        style={{ color: '#FFFFFF' }}
                      ></i>
                    </span>
                    <p className='ml-1 m-0'>
                      {initialsDepartment === 'O'
                        ? initialsVessel
                        : initialsDepartment}
                      /{('0000000' + ticket.ticketNumber).slice(-7)}/
                      {new Date().getFullYear()}
                    </p>
                  </div>

                  <div style={{ flexGrow: '1' }}></div>
                  {ticket.isImportant && (
                    <span className='text-danger border border-danger px-2 pb-1 rounded'>
                      <small>
                        <i className='fa fa-flag mr-1 text-danger'></i>
                        Important
                      </small>
                    </span>
                  )}
                </Col>

                <Col>
                  <h3 className='mt-5 mb-3'>{ticket.summary}</h3>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col md={12} className='mt-3'>
                            <Avatar
                              name={ticket.fromName}
                              maxInitials={2}
                              size='30'
                              textSizeRatio={2.5}
                              textMarginRatio={0.25}
                              random
                              round
                              className='mr-3'
                            />
                            {ticket.fromDepartment === 'Onboard' ? (
                              <span
                                className='font-weight-bold'
                                style={{ fontSize: '1.1em' }}
                              >
                                {`${ticket.fromTitle} ${ticket.fromName} - ${ticket.fromDesignation} M/V ${ticket.vessel}, raised this ticket`}
                              </span>
                            ) : (
                              <span
                                className='font-weight-bold'
                                style={{ fontSize: '1.1em' }}
                              >
                                {`${ticket.fromTitle} ${ticket.fromName} - ${ticket.fromDepartment}, raised this ticket for vessel M/V ${ticket.vessel}`}
                              </span>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className='ml-5 text-muted'>
                            <Moment format='ddd D MMM YYYY HH:MM'>
                              {ticket.createdAt}
                            </Moment>{' '}
                            hrs
                            <i className='far fa-clock ml-1'></i>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <div style={{ lineHeight: '22px' }}>
                              {ticket.description && Parser(ticket.description)}
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
                {ticket.attachment && (
                  <Col>
                    <Row>
                      <div
                        className='px-2 py-1 border border-primary rounded m-0 ml-3 mt-2 mb-0 text-primary'
                        style={{}}
                      >
                        <i class='fas fa-paperclip mr-2'></i>

                        <a
                          href={`${ticket.attachment}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          Attachment:{' '}
                          {ticket.attachment
                            .substr(ticket.attachment.lastIndexOf('.') + 1)
                            .toUpperCase()}{' '}
                          file
                        </a>
                      </div>
                    </Row>
                  </Col>
                )}

                <br />
                <Col className='pr-4 mt-1'>
                  <Row>
                    <Col md={10} className='border-bottom pb-2 mt-4'>
                      <i className='far fa-comments'></i>
                      {ticket.fromDepartment === 'Onboard' ? (
                        <span className='ml-2'>
                          {`Conversation between ${
                            ticket.toTitle ? ticket.toTitle : ' '
                          }${ticket.toName ? ticket.toName : ''} and
                ${ticket.fromTitle} ${ticket.fromName}`}
                        </span>
                      ) : (
                        <span className='ml-2'>
                          {`Conversation between ${
                            ticket.toTitle ? ticket.toTitle : ''
                          } ${ticket.toName ? ticket.toName + ' - ' : ' '}${
                            ticket.toDesignation
                          } M/V ${ticket.vessel} and ${ticket.fromTitle} ${
                            ticket.fromName
                          } - ${ticket.fromDepartment}
                `}
                        </span>
                      )}
                    </Col>
                    <Col
                      md={2}
                      className='border-bottom text-right pb-2 mt-3 pr-2'
                    >
                      {loadingClose && <Loader />}
                      {userInfo &&
                        userInfo._id === ticket.user &&
                        !ticket.isClosed && (
                          <Button
                            type='button'
                            className='btn btn-sm'
                            onClick={closeHandler}
                          >
                            Close this ticket
                          </Button>
                        )}
                    </Col>
                  </Row>
                </Col>

                <br />

                <Col className='mb-2 mt-4'>
                  <h5>Replies of the above ticket</h5>
                </Col>

                <Col>
                  {ticket.replies.length === 0 && (
                    <Message className='mt-1'>No Replies</Message>
                  )}
                  <ListGroup variant='flush'>
                    {ticket.replies.map((reply) =>
                      (userInfo.department &&
                        userInfo.department === 'Onboard') &
                      !reply.isApproved ? (
                        ''
                      ) : (
                        <ListGroup.Item key={reply._id}>
                          <Row>
                            <Col md={8} className='mt-1'>
                              <Avatar
                                name={reply.name}
                                size='30'
                                textSizeRatio={2.5}
                                textMarginRatio={0.25}
                                random
                                round
                                className='mr-3'
                              />
                              <span
                                className='font-weight-bold mr-3'
                                style={{ fontSize: '1.1em' }}
                              >
                                {reply.title} {reply.name} - {reply.department}
                              </span>
                            </Col>

                            <Col className='d-flex justify-content-end align-items-center text-muted'>
                              <span className='p-1 border border-grey text-grey rounded px-2 ml-4'>
                                R: {reply.replyNumber}
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col className='ml-5'>
                              <span className='text-muted'>
                                <Moment format='ddd D MMM YYYY HH:MM'>
                                  {reply.createdAt}
                                </Moment>{' '}
                                hrs
                                <i className='far fa-clock ml-1'></i>
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col className='ml-5 mt-3'>
                              <span
                                style={{
                                  lineHeight: '22px',
                                }}
                              >
                                {Parser(reply.replyText)}
                              </span>
                            </Col>
                          </Row>
                          {reply.attachment && (
                            <Col>
                              <Row>
                                <div
                                  className='px-2 py-1 border border-primary rounded m-0 ml-5 mt-2 mb-0 text-primary'
                                  style={{}}
                                >
                                  <i class='fas fa-paperclip mr-2'></i>

                                  <a
                                    href={`${reply.attachment}`}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    Attachment:{' '}
                                    {reply.attachment
                                      .substr(
                                        reply.attachment.lastIndexOf('.') + 1
                                      )
                                      .toUpperCase()}{' '}
                                    file
                                  </a>
                                </div>
                              </Row>
                            </Col>
                          )}
                          {loadingApproved && <Loader />}
                          {loadingDisapproved && <Loader />}
                          {!reply.isApproved & (reply.user !== userInfo._id) ? (
                            <Row>
                              <Col className='ml-5 text-right'>
                                <Button
                                  variant='success'
                                  size='sm'
                                  className='mr-2'
                                  onClick={() => approvedHandler(reply._id)}
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant='warning'
                                  size='sm'
                                  onClick={() => disapprovedHandler(reply._id)}
                                >
                                  Decline
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            ''
                          )}
                        </ListGroup.Item>
                      )
                    )}
                    {ticket.isClosed ? (
                      <>
                        <Message variant='success'>
                          This Ticket is closed
                        </Message>
                      </>
                    ) : (
                      <ListGroup.Item>
                        <Row>
                          <Col md={9} className='mb-2 mt-4'>
                            <h5>Write a reply</h5>
                          </Col>
                        </Row>
                        {errorTicketReply && (
                          <Message variant='danger'>{errorTicketReply}</Message>
                        )}
                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <ReactQuill
                              modules={TicketScreen.modules}
                              formats={TicketScreen.formats}
                              value={String(replyText)}
                              onChange={handleReplyText}
                              className={message.replyText && `is-invalid`}
                            />
                            <motion.div
                              animate={errorVariants}
                              className='invalid-feedback'
                            >
                              {message.replyText}
                            </motion.div>

                            <Form.Group
                              controlId='attachment'
                              className='mt-4'
                              style={{ width: 250 }}
                            >
                              <Form.File
                                id='image-file'
                                label='Attachment'
                                custom
                                autoComplete='off'
                                onChange={uploadFileHandler}
                                className={message.attachment && `is-invalid`}
                              ></Form.File>
                              <motion.div
                                animate={errorVariants}
                                className='invalid-feedback'
                              >
                                {message.attachment}
                              </motion.div>
                              {uploading && <Loader />}
                            </Form.Group>

                            <Button
                              type='Submit'
                              variant='primary'
                              className='mt-3'
                            >
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to='/login'>sign in</Link> to reply
                          </Message>
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
              </Col>

              <Col
                md={3}
                className='d-flex flex-column align-items-start text-muted pl-2'
              >
                <ListGroup className='w-100'>
                  <ListGroup.Item className='p-4 m-0 pb-0 mb-3'>
                    {(ticket.replies.length < 1) &
                    (currentDate > overdueDate) &
                    ticket.isClosed ? (
                      //1. WAITING, PENDING, CLOSED
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            Waited for 4 days
                          </p>
                        </span>

                        <span>
                          <div className='chip pending p-2 px-4 mb-3 mt-5'>
                            PENDING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Switched
                            to pending on{' '}
                            <Moment add={{ days: 4 }} format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            <>
                              Ticket was pending for{' '}
                              <Moment fromNow add={{ days: 4 }} ago>
                                {ticket.createdAt}
                              </Moment>
                            </>
                          </p>
                        </span>

                        <span>
                          <div className='chip ticket-closed p-2 px-4 mb-3 mt-5'>
                            TICKET CLOSED
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Closed
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.updatedAt}
                            </Moment>
                            <br />
                            <i className='far fa-check-circle mr-1'></i>Closed
                            by {ticket.fromTitle} {ticket.fromName}
                          </p>
                        </span>
                      </>
                    ) : (ticket.replies.length < 1) & ticket.isClosed ? (
                      //2. WAITING & CLOSED
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            {
                              <>
                                Waited for{' '}
                                <Moment from={ticket.createdAt} ago>
                                  {ticket.updatedAt}
                                </Moment>
                              </>
                            }
                          </p>
                        </span>

                        <span>
                          <div className='chip ticket-closed p-2 px-4 mb-3 mt-5'>
                            TICKET CLOSED
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Closed
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.updatedAt}
                            </Moment>
                            <br />
                            <i className='far fa-check-circle mr-1'></i>Closed
                            by {ticket.fromTitle} {ticket.fromName}
                          </p>
                        </span>
                      </>
                    ) : (ticket.replies.length < 1) &
                      (currentDate > overdueDate) ? (
                      //3. WAITING & PENDING
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>Waited for
                            4 days
                          </p>
                        </span>

                        <span>
                          <div className='chip pending p-2 px-4 mb-3 mt-5'>
                            PENDING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Switched
                            to pending on{' '}
                            <Moment add={{ days: 4 }} format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            {
                              <>
                                Pending since{' '}
                                <Moment fromNow add={{ days: 4 }} ago>
                                  {ticket.createdAt}
                                </Moment>
                              </>
                            }
                          </p>
                        </span>
                      </>
                    ) : (ticket.replies.length < 1) & !ticket.isClosed ? (
                      //4. WAITING
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            {
                              <>
                                Waiting to be attended since{' '}
                                <Moment fromNow ago>
                                  {ticket.createdAt}
                                </Moment>
                              </>
                            }
                          </p>
                        </span>
                      </>
                    ) : ticket.isClosed && ticketDate < replyDate ? (
                      //5. WAITING, PENDING, IN-PROGRESS, CLOSED

                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            Waited for 4 days
                          </p>
                        </span>

                        <span>
                          <div className='chip pending p-2 px-4 mb-3 mt-5'>
                            PENDING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Switched
                            to pending on{' '}
                            <Moment add={{ days: 4 }} format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-hourglass mr-1'></i>Ticket was
                            pending for{' '}
                            <Moment
                              from={ticket.replies[0].createdAt}
                              add={{ days: 4 }}
                              ago
                            >
                              {ticket.createdAt}
                            </Moment>
                          </p>
                        </span>

                        <span>
                          <div className='chip in-progress p-2 px-4 mb-3 mt-5'>
                            IN PROGRESS
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Attended
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.replies[0].createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Attended
                            by {ticket.replies[0].title}{' '}
                            {ticket.replies[0].name}
                            <br />
                            <i className='far fa-comments mr-1'></i>Ticket has{' '}
                            {ticket.replies.filter(function (s) {
                              return s.isApproved;
                            }).length === 1 ? (
                              <>1 reply</>
                            ) : (
                              <>
                                {
                                  ticket.replies.filter(function (r) {
                                    return r.isApproved;
                                  }).length
                                }{' '}
                                replies
                              </>
                            )}{' '}
                            {ticket.replies[ticket.replies.length - 1]
                              .isApproved && (
                              <>
                                <br />
                                <i className='far fa-comment-dots mr-1'></i>Last
                                replied by{' '}
                                {
                                  ticket.replies[ticket.replies.length - 1]
                                    .title
                                }{' '}
                                {ticket.replies[ticket.replies.length - 1].name}
                              </>
                            )}
                          </p>
                        </span>

                        <span>
                          <div className='chip ticket-closed p-2 px-4 mb-3 mt-5'>
                            TICKET CLOSED
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Closed
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.updatedAt}
                            </Moment>
                            <br />
                            <i className='far fa-check-circle mr-1'></i>Closed
                            by {ticket.fromTitle} {ticket.fromName}
                          </p>
                        </span>
                      </>
                    ) : ticket.replies.length > 0 &&
                      !ticket.isClosed &&
                      ticketDate < replyDate ? (
                      //6. WAITING, PENDING, IN-PROGRESS
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>Waited for
                            4 days
                          </p>
                        </span>

                        <span>
                          <div className='chip pending p-2 px-4 mb-3 mt-5'>
                            PENDING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Switched
                            to pending on{' '}
                            <Moment add={{ days: 4 }} format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-hourglass mr-1'></i>Ticket was
                            pending for{' '}
                            <Moment
                              from={ticket.replies[0].createdAt}
                              add={{ days: 4 }}
                              ago
                            >
                              {ticket.createdAt}
                            </Moment>
                          </p>
                        </span>

                        <span>
                          <div className='chip in-progress p-2 px-4 mb-3 mt-5'>
                            IN PROGRESS
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Attended
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.replies[0].createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Attended
                            by {ticket.replies[0].title}{' '}
                            {ticket.replies[0].name}
                            <br />
                            <i className='far fa-comments mr-1'></i>Ticket has{' '}
                            {ticket.replies.filter(function (s) {
                              return s.isApproved;
                            }).length === 1 ? (
                              <>1 reply</>
                            ) : (
                              <>
                                {
                                  ticket.replies.filter(function (r) {
                                    return r.isApproved;
                                  }).length
                                }{' '}
                                replies
                              </>
                            )}{' '}
                            {ticket.replies[ticket.replies.length - 1]
                              .isApproved && (
                              <>
                                <br />
                                <i className='far fa-comment-dots mr-1'></i>Last
                                replied by{' '}
                                {
                                  ticket.replies[ticket.replies.length - 1]
                                    .title
                                }{' '}
                                {ticket.replies[ticket.replies.length - 1].name}
                              </>
                            )}
                          </p>
                        </span>
                      </>
                    ) : ticket.replies.length > 0 &&
                      !ticket.isClosed &&
                      ticketDate >= replyDate ? (
                      //7. WAITING, IN-PROGRESS
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>
                            Ticket attended after{' '}
                            <Moment from={ticket.replies[0].createdAt} ago>
                              {ticket.createdAt}
                            </Moment>
                          </p>
                        </span>

                        <span>
                          <div className='chip in-progress p-2 px-4 mb-3 mt-5'>
                            IN PROGRESS
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Attended
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.replies[0].createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Attended
                            by {ticket.replies[0].title}{' '}
                            {ticket.replies[0].name}
                            <br />
                            <i className='far fa-comments mr-1'></i>Ticket has{' '}
                            {ticket.replies.filter(function (s) {
                              return s.isApproved;
                            }).length === 1 ? (
                              <>1 reply</>
                            ) : (
                              <>
                                {
                                  ticket.replies.filter(function (r) {
                                    return r.isApproved;
                                  }).length
                                }{' '}
                                replies
                              </>
                            )}{' '}
                            {ticket.replies[ticket.replies.length - 1]
                              .isApproved && (
                              <>
                                <br />
                                <i className='far fa-comment-dots mr-1'></i>Last
                                replied by{' '}
                                {
                                  ticket.replies[ticket.replies.length - 1]
                                    .title
                                }{' '}
                                {ticket.replies[ticket.replies.length - 1].name}
                              </>
                            )}
                          </p>
                        </span>
                      </>
                    ) : ticket.replies.length > 0 &&
                      ticket.isClosed &&
                      ticketDate >= replyDate ? (
                      //8. WAITING, IN-PROGRESS, CLOSED
                      <>
                        <span>
                          <div className='chip waiting p-2 px-4 mb-3'>
                            WAITING
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Issued
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Issued by{' '}
                            {ticket.fromTitle} {ticket.fromName}
                            <br />
                            <i className='far fa-hourglass mr-1'></i>Ticket
                            attended after{' '}
                            <Moment from={ticket.replies[0].createdAt} ago>
                              {ticket.createdAt}
                            </Moment>
                          </p>
                        </span>

                        <span>
                          <div className='chip in-progress p-2 px-4 mb-3 mt-5'>
                            IN PROGRESS
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Attended
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.replies[0].createdAt}
                            </Moment>
                            <br />
                            <i className='far fa-user-circle mr-1'></i>Attended
                            by {ticket.replies[0].title}{' '}
                            {ticket.replies[0].name}
                            <br />
                            <i className='far fa-comments mr-1'></i>Ticket has{' '}
                            {ticket.replies.filter(function (s) {
                              return s.isApproved;
                            }).length === 1 ? (
                              <>1 reply</>
                            ) : (
                              <>
                                {
                                  ticket.replies.filter(function (r) {
                                    return r.isApproved;
                                  }).length
                                }{' '}
                                replies
                              </>
                            )}{' '}
                            {ticket.replies[ticket.replies.length - 1]
                              .isApproved && (
                              <>
                                <br />
                                <i className='far fa-comment-dots mr-1'></i>Last
                                replied by{' '}
                                {
                                  ticket.replies[ticket.replies.length - 1]
                                    .title
                                }{' '}
                                {ticket.replies[ticket.replies.length - 1].name}
                              </>
                            )}
                          </p>
                        </span>

                        <span>
                          <div className='chip ticket-closed p-2 px-4 mb-3 mt-5'>
                            TICKET CLOSED
                          </div>
                          <p className='mb-0' style={{ lineHeight: '28px' }}>
                            <i className='far fa-calendar-alt mr-1'></i>Closed
                            on{' '}
                            <Moment format='ddd D MMM YYYY'>
                              {ticket.updatedAt}
                            </Moment>
                            <br />
                            <i className='far fa-check-circle mr-1'></i>Closed
                            by {ticket.fromTitle} {ticket.fromName}
                          </p>
                        </span>
                      </>
                    ) : (
                      ''
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </motion.div>
        </>
      )}
    </>
  );
};

TicketScreen.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

TicketScreen.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
];

export default TicketScreen;
