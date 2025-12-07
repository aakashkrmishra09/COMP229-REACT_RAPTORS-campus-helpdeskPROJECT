const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 

// FIX: Added the dot (.) to match your actual filename 'ticket.controller.js'
const ticketController = require('../controllers/ticket.controller'); 

// @route   POST api/tickets
// @desc    Create a ticket
// @access  Private
router.post('/', auth, ticketController.createTicket);

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', auth, ticketController.getAllTickets);

// @route   GET api/tickets/:id
// @desc    Get ticket by ID
// @access  Private
router.get('/:id', auth, ticketController.getTicketById);

// @route   PUT api/tickets/:id
// @desc    Update ticket
// @access  Private
router.put('/:id', auth, ticketController.updateTicket);

module.exports = router;