// client/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', userType: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password, userType } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1>Register</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" name="username" value={username} onChange={onChange} placeholder="Username" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" value={email} onChange={onChange} placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" value={password} onChange={onChange} placeholder="Password" required />
          </div>
          <div className="mb-3">
            <select name="userType" className="form-control" value={userType} onChange={onChange}>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;