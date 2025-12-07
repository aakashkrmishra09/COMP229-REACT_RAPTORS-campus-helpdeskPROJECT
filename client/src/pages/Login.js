// client/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1>Sign In</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" value={email} onChange={onChange} placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" value={password} onChange={onChange} placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="mt-3">No account? <a href="/register">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
