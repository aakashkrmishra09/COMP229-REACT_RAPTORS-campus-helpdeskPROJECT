// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await api.get('/tickets', { headers: { 'x-auth-token': token } });
        setTickets(res.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
             localStorage.removeItem('token');
             navigate('/login');
        }
      }
    };
    fetchTickets();
  }, [navigate]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Ticket Dashboard</h1>
        <Link to="/create-ticket" className="btn btn-success">
          + Create New Ticket
        </Link>
      </div>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.recordNumber}</td>
              <td>{ticket.title}</td>
              <td>
                <span className={`badge ${
                  ticket.status === 'New' ? 'bg-primary' : 
                  ticket.status === 'Closed' ? 'bg-secondary' : 'bg-warning text-dark'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td>
                <span className={`badge ${
                   ticket.priority === 'Urgent' ? 'bg-danger' : 'bg-info text-dark'
                }`}>
                   {ticket.priority}
                </span>
              </td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && <p className="text-center mt-4">No tickets found. Create one to get started!</p>}
    </div>
  );
};

export default Dashboard;