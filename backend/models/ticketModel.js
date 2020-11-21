import mongoose from 'mongoose';

const replySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    replyText: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

////////////////////////////

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    toTitle: {
      type: String,
      required: true,
    },
    toName: {
      type: String,
      required: true,
    },
    toDesignation: {
      type: String,
      required: true,
    },
    toDepartment: {
      type: String,
      required: true,
    },
    fromTitle: {
      type: String,
      required: true,
    },
    fromName: {
      type: String,
      required: true,
    },
    fromDesignation: {
      type: String,
      required: true,
    },
    fromDepartment: {
      type: String,
      required: true,
    },
    vessel: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
