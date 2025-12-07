const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json()); 

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tickets', require('./routes/tickets'));

// Base Route
app.get('/', (req, res) => res.send('COMP229 Help Desk API Running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));