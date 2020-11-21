import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import './DashboardScreen.css';
//
import Ticket from '../components/Ticket';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listTickets } from '../actions/ticketActions';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const ticketList = useSelector((state) => state.ticketList);
  const { loading, error, tickets } = ticketList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTickets());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row>
        <Col>
          <h1>All Tickets</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>T</th>
                    <th>Summary</th>
                    <th>From</th>
                    <th>Vessel</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th>Attended By</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, i) => (
                    <Ticket ticket={ticket} key={i} i={i} />
                  ))}
                </tbody>
              </Table>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
