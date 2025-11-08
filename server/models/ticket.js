const mongoose = require('mongoose');

// Helper function to generate the ticket number (e.g., 20251107-0000001)
async function generateTicketNumber() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;

  // Find the last ticket created today to increment the count
  const lastTicket = await this.constructor
    .findOne({ ticketNumber: new RegExp('^' + datePrefix) })
    .sort('-createdAt'); // Sort by creation time to get the last one

  let nextSeq = '0000001';
  if (lastTicket) {
    const lastSeq = parseInt(lastTicket.ticketNumber.split('-')[1]);
    nextSeq = (lastSeq + 1).toString().padStart(7, '0');
  }
  return `${datePrefix}-${nextSeq}`;
}

const TicketIterationSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const TicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Dispatched', 'Closed', 'Cancelled'],
      default: 'New',
    },
s   assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This will link to an Admin user
      default: null,
    },
    resolution: {
      type: String,
      default: '',
    },
    iterations: [TicketIterationSchema], // This is the audit trail
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Middleware to generate ticket number before saving a new ticket
TicketSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.ticketNumber = await generateTicketNumber.call(this);
  }
  next();
});

module.exports = mongoose.model('Ticket', TicketSchema);