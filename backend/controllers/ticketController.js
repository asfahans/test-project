import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';

// @Desc    Fetch all Tickets
// @Route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  res.json(tickets);
});

// @Desc    Fetch single Ticket
// @Route   GET /api/tickets/:id
// @access  Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error('Ticket not found');
  }
});

// @Desc    Create new reply
// @Route   POST /api/tickets/:id/replies
// @access  Private
const createTicketReply = asyncHandler(async (req, res) => {
  const { replyText } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    const reply = {
      title: req.user.title,
      name: req.user.name,
      designation: req.user.designation,
      department: req.user.department,
      replyText,
      user: req.user._id,
    };
    console.log(reply);

    ticket.replies.push(reply);

    await ticket.save();
    res.status(201).json({ message: 'Reply added' });
  } else {
    res.status(404);
    throw new Error('Ticket not found');
  }
});

// // @Desc    Create a ticket
// // @Route   POST /api/tickets
// // @access  Private
// const createTicket = asyncHandler(async (req, res) => {
//   const {
//     toTitle,
//     toName,
//     toDesignation,
//     toDepartment,
//     vessel,
//     summary,
//     description,
//     isImportant,
//   } = req.body;

//   const ticket = await Ticket.create({
//     user: req.user._id,
//     toTitle,
//     toName,
//     toDesignation,
//     toDepartment,
//     fromTitle: req.user.title,
//     fromName: req.user.name,
//     fromDesignation: req.user.designation,
//     fromDepartment: req.user.department,
//     vessel,
//     summary,
//     description,
//     isImportant,
//   });

//   const createdTicket = await ticket.save();
//   res.status(201).json(ticket);
// });

// @Desc    Create a ticket
// @Route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const {
    toTitle, // need to get this
    toName,
    toDesignation,
    toDepartment,
    vessel,
    summary,
    description,
    isImportant,
  } = req.body;

  if (toDepartment === 'Onboard') {
    // Rahul Gupta Sending Ticket To Master OnBoard
    const toUser = await User.find({
      'assignedVessels.name': vessel,
      department: toDepartment,
    });

    const ticket = await Ticket.create({
      user: req.user._id,
      toTitle: toUser[0].title,
      toName: toUser[0].name,
      toDesignation: toUser[0].designation,
      toDepartment,
      fromTitle: req.user.title,
      fromName: req.user.name,
      fromDesignation: req.user.designation,
      fromDepartment: req.user.department,
      vessel,
      summary,
      description,
      isImportant,
    });
    // const createdTicket = await ticket.save();
    res.status(201).json(ticket);
  } else {
    // Master Sending Ticket To Technical Department

    const toUser = await User.find({
      'assignedVessels.name': req.user.assignedVessels[0].name,
      department: toDepartment,
    });

    console.log(toUser[0].title);
    const ticket = await Ticket.create({
      user: req.user._id,
      toTitle: toUser[0].title,
      toName: toUser[0].name,
      toDesignation: toUser[0].designation,
      toDepartment,
      fromTitle: req.user.title,
      fromName: req.user.name,
      fromDesignation: req.user.designation,
      fromDepartment: req.user.department,
      vessel: req.user.assignedVessels[0].name,
      summary,
      description,
      isImportant,
    });
    // const createdTicket = await ticket.save();
    res.status(201).json(ticket);
  }
});

export { getTickets, getTicketById, createTicketReply, createTicket };
