import React, { useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAllTickets } from '../actions/ticketActions';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import Ticket from '../components/Ticket';
import { motion } from 'framer-motion';

const TicketListScreen = ({ history, match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const ticketAllList = useSelector((state) => state.ticketAllList);
  const {
    loading,
    error,
    tickets,
    pages,
    page,
    pageSize,
    count,
  } = ticketAllList;

  const ticketDelete = useSelector((state) => state.ticketDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = ticketDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllTickets(keyword, pageNumber));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successDelete, keyword, pageNumber]);

  return (
    <>
      <Row>
        <Col className='d-flex align-items-end pl-0'>
          <h4 className='mb-2'>{keyword ? 'Search results' : 'All Tickets'}</h4>
        </Col>
        <Col md={3} className='d-flex justify-content-end pb-2'>
          <SearchBox
            history={history}
            url='admin/ticketlist'
            searchKeyword={keyword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
                      <th width='210'>From</th>
                      <th width='180'>Vessel</th>
                      <th width='170'>Created On</th>
                      <th width='120'>Status</th>
                      <th width='210'>Attended By</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, i) => (
                      <Ticket
                        ticket={ticket}
                        key={i}
                        i={i}
                        pageName='TicketList'
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
          <Paginate pages={pages} page={page} pageName='TicketList' />
        </Col>
        <Col className='text-right mr-0 pr-0'>
          <h5>{count} tickets</h5>
        </Col>
      </Row>
    </>
  );
};

export default TicketListScreen;
