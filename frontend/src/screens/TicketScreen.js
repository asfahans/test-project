import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import { listTicketDetails, createTicketReply } from '../actions/ticketActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const TicketScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { loading, error, ticket } = ticketDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ticketReplyCreate = useSelector((state) => state.ticketReplyCreate);
  const {
    success: successTicketReply,
    error: errorTicketReply,
  } = ticketReplyCreate;

  useEffect(() => {
    if (successTicketReply) {
      // alert('reply submitted');
      setReplyText('');
      dispatch({ type: 'TICKET_CREATE_REPLY_RESET' });
    }
    dispatch(listTicketDetails(match.params.id));
  }, [dispatch, match, successTicketReply]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTicketReply(match.params.id, { replyText }));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x'></i>
            <i className='fas fa-desktop fa-stack-1x fa-inverse'></i>
          </span>

          <span>{ticket.fromDepartment}</span>

          <Row>
            <Col md={8}>
              <h3>{ticket.summary}</h3>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>{`${ticket.fromDesignation} - ${ticket.vessel} raised this ticket`}</strong>
                      </Col>
                      <Col className='text-right'>{ticket.date}</Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <p>{ticket.description}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>{`Reply to ${ticket.fromDesignation} - ${ticket.vessel}`}</Col>
          </Row>
          <Row>
            <Col md={8}>
              <h2>Replies</h2>
              {ticket.replies.length === 0 && <Message>No Replies</Message>}
              <ListGroup variant='flush'>
                {ticket.replies.map((reply) => (
                  <ListGroup.Item key={reply._id}>
                    <strong>
                      {reply.title} {reply.name}
                    </strong>
                    <br />
                    <p>{reply.designation}</p>
                    <p>{reply.createdAt.substring(0, 10)}</p>
                    <p>{reply.replyText}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Reply</h2>
                  {errorTicketReply && (
                    <Message variant='danger'>{errorTicketReply}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='replyText'>
                        <Form.Label>Reply</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='5'
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='Submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/'>sign in</Link> to reply
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TicketScreen;
