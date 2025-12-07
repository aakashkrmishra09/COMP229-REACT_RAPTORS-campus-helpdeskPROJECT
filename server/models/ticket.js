const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  // Requirement: Unique Record Number (e.g. 20220701-0000001)
  recordNumber: { 
    type: String, 
    unique: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Urgent'], 
    default: 'Low' 
  },
  // Requirement: Status Field
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Dispatched', 'Resolved', 'Closed', 'Cancelled'], 
    default: 'New' 
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  
  // Requirement: Resolution field needed to close
  resolution: { type: String, default: '' },

  // Link to the User who submitted it
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Requirement: Audit Trail / Iterations
  iterations: [{
    date: { type: Date, default: Date.now },
    comment: String,
    statusChange: String,
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String
  }]
}, { timestamps: true });

// Auto-generate the Ticket Record Number before saving
TicketSchema.pre('save', async function(next) {
  if (!this.recordNumber) {
    // Generate YYYYMMDD string
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ""); 
    
    // Count tickets created today to generate the sequence
    const count = await mongoose.model('Ticket').countDocuments({
      createdAt: { 
        $gte: new Date(new Date().setHours(0,0,0,0)), 
        $lt: new Date(new Date().setHours(23,59,59,999)) 
      }
    });
    
    // Format: YYYYMMDD-000000X
    const sequence = (count + 1).toString().padStart(7, '0'); 
    this.recordNumber = `${dateStr}-${sequence}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', TicketSchema);