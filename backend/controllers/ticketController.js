import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js';

// @Desc    Fetch all Tickets
// @Route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword;

  const arrayOfVessels = req.user.assignedVessels.map(function (vessel) {
    return vessel.name;
  });

  const count = await Ticket.countDocuments({
    $or: [
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },

      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },
    ],
  });

  // const [assignedVessels] = req.user.assignedVessels;
  // //let arrayOfVessels = assignedVessels && assignedVessels.split(',');
  // console.log(assignedVessels.name);

  const tickets = await Ticket.find({
    $or: [
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { toDepartment: req.user.department },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },

      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { vessel: { $in: arrayOfVessels } },
          { fromDepartment: req.user.department },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },
    ],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ updatedAt: -1 });

  // console.log(tickets[0].vessel);
  // console.log(req.user.assignedVessels[0].name);

  res.json({
    tickets,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize,
    count,
  });
});

// @Desc    Fetch My Tickets
// @Route   GET /api/tickets/my
// @access  Private
const getMyTickets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword;

  const count = await Ticket.countDocuments({
    $or: [
      {
        $and: [
          { user: req.user._id },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },
    ],
  });

  const tickets = await Ticket.find({
    $or: [
      {
        $and: [
          { user: req.user._id },
          { summary: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { fromName: { $regex: keyword, $options: 'i' } },
        ],
      },
      {
        $and: [
          { user: req.user._id },
          { vessel: { $regex: keyword, $options: 'i' } },
        ],
      },
    ],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ updatedAt: -1 });

  res.json({
    tickets,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize,
    count,
  });
});

// @Desc    Fetch All Tickets
// @Route   GET /api/tickets/all
// @access  Private/Admin
const getAllTickets = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword;

  const count = await Ticket.countDocuments({
    $or: [
      {
        $and: [{ summary: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ description: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ fromName: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ vessel: { $regex: keyword, $options: 'i' } }],
      },
    ],
  });

  const tickets = await Ticket.find({
    $or: [
      {
        $and: [{ summary: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ description: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ fromName: { $regex: keyword, $options: 'i' } }],
      },
      {
        $and: [{ vessel: { $regex: keyword, $options: 'i' } }],
      },
    ],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ updatedAt: -1 });

  res.json({
    tickets,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize,
    count,
  });
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

// @Desc    Delete a Ticket
// @Route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    await ticket.remove();
    res.json({ message: 'Ticket removed' });
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

  const lastId = await Ticket.findById(req.params.id, {
    replies: { $slice: -1 },
  });

  if (ticket && !ticket.isClosed) {
    const reply = {
      replyNumber: lastId.replies[0] ? lastId.replies[0].replyNumber + 1 : 1,
      title: req.user.title,
      name: req.user.name,
      designation: req.user.designation,
      department: req.user.department,
      isAssistant: req.user.isAssistant,
      isApproved: req.user.isAssistant ? false : true,
      replyText,
      user: req.user._id,
    };

    if (!ticket.toName) {
      //if (ticket.user !== req.user._id) {
      if (ticket.user.equals(req.user._id)) {
        res.status(400);
        throw new Error('Not an authorized action');
      } else {
        ticket.toTitle = req.user.title;
        ticket.toName = req.user.name;
        ticket.toDesignation = req.user.designation;
        ticket.isAssistant = req.user.isAssistant;
        ticket.isApproved = req.user.isAssistant ? false : true;

        ticket.replies.push(reply);

        await ticket.save();

        res.status(201).json({ message: 'Reply added' });
      }
    } else {
      ticket.replies.push(reply);
      await ticket.save();
      res.status(201).json({ message: 'Reply added' });
    }
  } else {
    res.status(404);
    throw new Error('Ticket not found');
  }
});

// @Desc    Create a ticket
// @Route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const lastId = await Ticket.find({}).sort({ _id: -1 }).limit(1);

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
      designation: toDesignation,
    });

    const ticket = await Ticket.create({
      user: req.user._id,
      ticketNumber: lastId[0] ? lastId[0].ticketNumber + 1 : 1,
      // toTitle: toUser[0].title,
      // toName: toUser[0].name,
      toDesignation,
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

    const ticket = await Ticket.create({
      user: req.user._id,
      ticketNumber: lastId[0] ? lastId[0].ticketNumber + 1 : 1,
      //toTitle: toUser[0].title,
      //toName: toUser[0].name,
      //toDesignation: toUser[0].designation,
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

// @Desc    Update Ticket to closed
// @Route   PUT /api/tickets/:id/close
// @access  Private
const updateTicketToClosed = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.isClosed = true;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error('Ticket not found');
  }
});

// @Desc    Update Ticket to Approved
// @Route   PUT /api/tickets/:id/reply/:replyId/approved
// @access  Private
const updateReplyToApproved = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (
    ticket.replies.filter(
      (reply) => reply._id.toString() === req.params.replyId
    ).length === 0
  ) {
    res.status(404);
    throw new Error('Reply does not exist');
  } else {
    const reply = ticket.replies.filter(
      (item) => item._id.toString() === req.params.replyId
    );
    reply[0].isApproved = true;
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  }
});

// @Desc    Delete a Reply on Disapproved
// @Route   DELETE /api/tickets/:id/reply/:replyId
// @access  Private
const deleteReply = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (
    ticket.replies.filter(
      (reply) => reply._id.toString() === req.params.replyId
    ).length === 0
  ) {
    res.status(404);
    throw new Error('Reply does not exist');
  }

  const removeIndex = await ticket.replies
    .map((item) => item._id.toString())
    .indexOf(req.params.replyId);

  await ticket.replies.splice(removeIndex, 1);

  const replyDeleted = await ticket.save();
  res.json(replyDeleted);
});

export {
  getTickets,
  getTicketById,
  createTicketReply,
  createTicket,
  deleteTicket,
  updateTicketToClosed,
  updateReplyToApproved,
  getMyTickets,
  getAllTickets,
  deleteReply,
};
