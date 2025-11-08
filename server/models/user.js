const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 'student', 'staff', 'admin' (as per your project requirements)
  userType: {
    type: String,
    required: true,
    enum: ['student', 'staff', 'admin'],
    default: 'student',
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);