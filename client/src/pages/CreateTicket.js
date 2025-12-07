// client/src/pages/CreateTicket.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    customerName: '',
    customerEmail: ''
  });
  const navigate = useNavigate();

  const { title, description, priority, customerName, customerEmail } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await api.post('/tickets', formData, {
        headers: { 'x-auth-token': token }
      });
      // Redirect back to dashboard after successful creation
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating ticket');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="large text-primary">Create New Ticket</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Ticket Title</label>
            <input type="text" className="form-control" name="title" value={title} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={description} onChange={onChange} required rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select className="form-control" name="priority" value={priority} onChange={onChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input type="text" className="form-control" name="customerName" value={customerName} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Customer Email</label>
            <input type="email" className="form-control" name="customerEmail" value={customerEmail} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;