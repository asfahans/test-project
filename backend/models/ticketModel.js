import mongoose from 'mongoose';

const replySchema = mongoose.Schema(
  {
    replyNumber: {
      type: Number,
      default: 1,
    },
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
    isAssistant: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: true,
    },
    replyText: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
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
    ticketNumber: {
      type: Number,
      default: 1,
    },
    toTitle: {
      type: String,
      //required: true,
    },
    toName: {
      type: String,
      //required: true,
    },
    toDesignation: {
      type: String,
      //required: true,
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
    isClosed: {
      type: Boolean,
      default: false,
    },
    attachment: {
      type: String,
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
