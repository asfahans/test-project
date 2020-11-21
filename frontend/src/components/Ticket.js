import React from 'react';
import { Link } from 'react-router-dom';

const Ticket = ({ ticket, i }) => {
  return (
    <tr key={ticket._id}>
      <td>{i + 1}</td>
      <td>
        {ticket.fromDepartment === 'Technical Department' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x'></i>
            <i className='fas fa-ship fa-stack-1x fa-inverse'></i>
          </span>
        ) : ticket.fromDepartment === 'IT Department' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x'></i>
            <i className='fas fa-desktop fa-stack-1x fa-inverse'></i>
          </span>
        ) : ticket.fromDepartment === 'Onboard' ? (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x'></i>
            <i className='fas fa-desktop fa-stack-1x fa-inverse'></i>
          </span>
        ) : (
          <span className='fa-stack'>
            <i className='fas fa-square fa-stack-2x'></i>
            <i className='fas fa-user fa-stack-1x fa-inverse'></i>
          </span>
        )}
      </td>
      <td>
        <Link to={`/ticket/${ticket._id}`}>{ticket.summary}</Link>
      </td>
      <td>{ticket.fromName}</td>
      <td>{ticket.vessel}</td>
      <td>{ticket.date}</td>
      <td>{ticket.date}</td>
      <td>{ticket.toName}</td>
    </tr>
  );
};

export default Ticket;
