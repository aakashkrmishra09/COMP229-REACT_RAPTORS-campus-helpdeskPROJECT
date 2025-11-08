const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/ticket');
const User = require('../models/user');

// @route   POST api/tickets
// @desc    Create a new ticket
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, category, priority } = req.body;

  try {
    const newTicket = new Ticket({
      title,
      description,
      category,
      priority,
      submittedBy: req.user.id,
      iterations: [
        {
          comment: 'Ticket created.',
          commentedBy: req.user.id,
        },
      ],
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tickets
// @desc    Get all tickets (or filter by status)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    let tickets;

    if (status === 'all') {
      // View ALL tickets (for admin/dashboard)
      tickets = await Ticket.find().sort({ createdAt: -1 });
    } else {
      // Default: View all tickets that are NOT Closed or Cancelled
      tickets = await Ticket.find({
        status: { $nin: ['Closed', 'Cancelled'] },
      }).sort({ createdAt: -1 });
    }

    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tickets/:id
// @desc    Get a single ticket by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('submittedBy', ['username', 'email'])
      .populate('assignedTo', ['username', 'email'])
      .populate('iterations.commentedBy', ['username', 'email']);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tickets/:id
// @desc    Update a ticket (change status, add comment, assign)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { status, resolution, assignedTo, comment } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(4404).json({ msg: 'Ticket not found' });
    }

    // Requirement: "Once the status of a Ticket Record is set to CLOSED it will not accept any further modifications."
    if (ticket.status === 'Closed') {
      return res
        .status(400)
        .json({ msg: 'Cannot modify a closed ticket.' });
    }

    // Requirement: "Neither the user nor the admin can delete a ticket. The ticket must change its status to Cancelled."
    // We handle 'Cancelled' as a status update.

    // Only Admins can assign or change status
    const user = await User.findById(req.user.id);
    if (user.userType === 'admin') {
      if (status) ticket.status = status;
      if (assignedTo) ticket.assignedTo = assignedTo;

      // Requirement: "Resolution Field which must be filled out before a ticket can be officially closed."
      if (status === 'Closed') {
        if (!resolution) {
          return res
            .status(400)
            .json({ msg: 'Resolution is required to close a ticket.' });
        }
        ticket.resolution = resolution;
      }
    }

    // Add an iteration for the update (audit trail)
    if (comment) {
      ticket.iterations.push({
        comment,
        commentedBy: req.user.id,
      });
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Note: There is no DELETE route, as per the project spec.
// "Neither the user nor the admin can delete a ticket. The ticket must change its status to Cancelled."
// This is handled by the PUT route above.

module.exports = router;