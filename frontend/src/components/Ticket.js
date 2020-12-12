import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import './Ticket.css';
import { deleteTicket } from '../actions/ticketActions';
import { Button } from 'react-bootstrap';

const Ticket = ({ ticket, i, pageName }) => {
  const dispatch = useDispatch();

  const ticketList = useSelector((state) => state.ticketList);
  const { page, pageSize } = ticketList;

  const ticketMyList = useSelector((state) => state.ticketMyList);
  const {
    page: ticketMyListPage,
    pageSize: ticketMyListPageSize,
  } = ticketMyList;

  const ticketAllList = useSelector((state) => state.ticketAllList);
  const {
    page: ticketAllListPage,
    pageSize: ticketAllListPageSize,
  } = ticketAllList;

  const overdueDate = new Date(ticket.createdAt);
  overdueDate.setDate(overdueDate.getDate() + 4);
  const currentDate = new Date();

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      dispatch(deleteTicket(id));
    }
  };

  const initialsDepartment = ticket.fromDepartment
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '');

  const initialsVessel = ticket.vessel
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '');

  return (
    <tr key={ticket._id}>
      <td>
        {pageName === 'Dashboard'
          ? (page - 1) * pageSize + i + 1
          : pageName === 'Profile'
          ? (ticketMyListPage - 1) * ticketMyListPageSize + i + 1
          : pageName === 'TicketList'
          ? (ticketAllListPage - 1) * ticketAllListPageSize + i + 1
          : ''}
        .
      </td>
      <td>
        {ticket.fromDepartment === 'Technical Department' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x text-primary'></i>
            <i className='fas fa-ship fa-stack-1x fa-inverse text-white'></i>
          </span>
        ) : ticket.fromDepartment === 'IT Department' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x text-success'></i>
            <i className='fas fa-desktop fa-stack-1x fa-inverse text-white'></i>
          </span>
        ) : ticket.fromDepartment === 'Crewing Department' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x text-info'></i>
            <i className='fas fa-user fa-stack-1x fa-inverse text-white'></i>
          </span>
        ) : ticket.fromDepartment === 'Onboard' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x text-danger'></i>
            <i className='fas fa-user fa-stack-1x fa-inverse text-white'></i>
          </span>
        ) : (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x text-warning'></i>
            <i
              className='fas fa-coins fa-stack-1x fa-inverse text-white'
              style={{ color: '#FFFFFF' }}
            ></i>
          </span>
        )}
      </td>
      <td>
        {initialsDepartment === 'O' ? initialsVessel : initialsDepartment}/
        {('0000000' + ticket.ticketNumber).slice(-7)}/{new Date().getFullYear()}
      </td>
      <td className='text-truncate'>
        <Link to={`/ticket/${ticket._id}`}>
          {ticket.summary.length > 100
            ? ticket.summary.substring(0, 100) + '...'
            : ticket.summary}
        </Link>
      </td>
      <td>{ticket.fromTitle + ' ' + ticket.fromName}</td>
      <td>{ticket.vessel}</td>
      <td>
        <Moment format='DD/MM/YYYY hh:mm a'>{ticket.createdAt}</Moment>{' '}
      </td>
      <td>
        {!ticket.toName & (currentDate > overdueDate) & !ticket.isClosed ? (
          <div className='chip pending'>Pending</div>
        ) : ticket.isClosed ? (
          <div className='chip ticket-closed'>Ticket closed</div>
        ) : !ticket.toName ? (
          <div className='chip waiting'>Waiting</div>
        ) : (
          <div className='chip in-progress'>In progress</div>
        )}
      </td>
      {pageName !== 'Profile' && (
        <td>
          {ticket.toTitle &&
            ticket.toTitle + ' ' + ticket.toName &&
            ticket.toTitle + ' ' + ticket.toName}
        </td>
      )}
      {pageName === 'TicketList' && (
        <td className='text-center p-2 pr-3'>
          <Button
            variant='danger'
            className='btn-sm pt-0 '
            style={{ height: '25px', width: '27px' }}
            onClick={() => deleteHandler(ticket._id)}
          >
            <i className='fas fa-trash'></i>
          </Button>
        </td>
      )}
    </tr>
  );
};

export default Ticket;
