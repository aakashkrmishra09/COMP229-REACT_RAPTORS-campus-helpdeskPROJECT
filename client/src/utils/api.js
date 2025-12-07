// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Points to your running backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;