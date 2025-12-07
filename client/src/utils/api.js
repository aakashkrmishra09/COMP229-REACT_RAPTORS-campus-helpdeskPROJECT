// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  // PASTE YOUR RENDER URL HERE (Make sure to keep /api at the end)
  baseURL: 'https://react-raptors-backend.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;