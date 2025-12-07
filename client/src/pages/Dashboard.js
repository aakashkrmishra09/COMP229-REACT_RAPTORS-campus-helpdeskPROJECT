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
      }
    };
    fetchTickets();
  }, [navigate]);

  // Helper for Status Colors
  const getStatusBadge = (status) => {
    switch(status) {
        case 'New': return 'bg-success';      // Green
        case 'In Progress': return 'bg-primary'; // Blue
        case 'Closed': return 'bg-secondary'; // Grey
        default: return 'bg-warning text-dark'; // Yellow
    }
  };

  return (
    <div className="container">
      {/* Header Card */}
      <div className="custom-card d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-gradient mb-1">Mission Dashboard</h2>
          <p className="text-muted mb-0">Manage your active support tickets.</p>
        </div>
        <Link to="/create-ticket" className="btn btn-raptor shadow-lg">
          + New Ticket
        </Link>
      </div>

      {/* Table Card */}
      <div className="custom-card p-0 overflow-hidden">
        <table className="table mb-0">
          <thead>
            <tr>
              <th className="p-4 text-light">ID</th>
              <th className="p-4 text-light">Title</th>
              <th className="p-4 text-light">Status</th>
              <th className="p-4 text-light">Priority</th>
              <th className="p-4 text-light">Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <tr key={ticket._id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td className="p-4 font-monospace text-muted">{ticket.recordNumber}</td>
                  <td className="p-4 fw-bold text-white">{ticket.title}</td>
                  <td className="p-4">
                    <span className={`badge ${getStatusBadge(ticket.status)} px-3 py-2`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">
                     {ticket.priority}
                  </td>
                  <td className="p-4 text-muted">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center p-5 text-muted">
                        No active tickets. Click "New Ticket" to launch one.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;