import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import './DashboardScreen.css';
//
import Ticket from '../components/Ticket';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';
import { listTickets } from '../actions/ticketActions';
import { motion } from 'framer-motion';

const DashboardScreen = ({ history, match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const ticketList = useSelector((state) => state.ticketList);
  const { loading, error, tickets, pages, page, count } = ticketList;

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { success: successCreate } = ticketCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listTickets(keyword, pageNumber));
    } else {
      history.push('/');
    }

    if (!tickets) {
      dispatch(listTickets(keyword, pageNumber));
    }

    if (successCreate) {
      dispatch(listTickets(keyword, pageNumber));
    }
  }, [dispatch, history, userInfo, keyword, pageNumber, successCreate]);

  return (
    <>
      <Row>
        <Col className='d-flex align-items-end pl-0'>
          <h4 className='mb-2'>{keyword ? 'Search results' : 'Dashboard'}</h4>
        </Col>
        <Col md={3} className='d-flex justify-content-end pb-2'>
          <SearchBox
            history={history}
            url='dashboard'
            searchKeyword={keyword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
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
                      <th width='150'>Ticket #.</th>
                      <th>Summary</th>
                      <th width='220'>From</th>
                      <th width='180'>Vessel</th>
                      <th width='170'>Created On</th>
                      <th width='120'>Status</th>
                      <th width='220'>Attended By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, i) => (
                      <Ticket
                        ticket={ticket}
                        key={i}
                        i={i}
                        pageName='Dashboard'
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
          <Paginate
            pages={pages}
            page={page}
            pageName='Dashboard'
            keyword={keyword ? keyword : ''}
          />
        </Col>
        <Col className='text-right mr-0 pr-0'>
          <h5>{count} tickets</h5>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
