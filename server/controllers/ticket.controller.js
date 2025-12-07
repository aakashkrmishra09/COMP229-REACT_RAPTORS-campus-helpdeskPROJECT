const Ticket = require('../models/ticket');
const User = require('../models/user');

// @desc    Create a new ticket
exports.createTicket = async (req, res) => {
  const { title, description, priority, customerName, customerEmail } = req.body;

  try {
    const user = await User.findById(req.user.id);
    
    const newTicket = new Ticket({
      title,
      description,
      priority,
      customerName, 
      customerEmail,
      submittedBy: req.user.id, // Comes from auth middleware
      iterations: [
        {
          comment: 'Ticket created.',
          commentedBy: req.user.id,
          username: user ? user.username : 'User',
          statusChange: 'New',
        },
      ],
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    // Return all tickets sorted by date (Newest first)
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a ticket (change status, add comment)
exports.updateTicket = async (req, res) => {
  const { status, resolution, comment } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    [cite_start]// Requirement: "Once CLOSED it will not accept any further modifications." [cite: 177]
    if (ticket.status === 'Closed') {
      return res.status(400).json({ msg: 'Cannot modify a closed ticket.' });
    }

    const user = await User.findById(req.user.id);
    
    // Check if status is changing
    let statusChange = null;
    if (status && status !== ticket.status) {
      statusChange = status;
      ticket.status = status;
    }

    [cite_start]// Requirement: Resolution required to Close [cite: 179]
    if (status === 'Closed' && !resolution && !ticket.resolution) {
      return res.status(400).json({ msg: 'Resolution is required to close a ticket.' });
    }
    if (resolution) ticket.resolution = resolution;

    [cite_start]// Requirement: Audit Trail / Iterations [cite: 176]
    if (comment || statusChange) {
      ticket.iterations.push({
        comment: comment || 'Status updated',
        commentedBy: req.user.id,
        username: user ? user.username : 'Unknown',
        statusChange: statusChange || ticket.status,
      });
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};