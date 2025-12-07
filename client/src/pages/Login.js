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
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div>
      <div className="glow-orange"></div> 
      
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="col-md-5">
            <div className="custom-card">
              <div className="text-center mb-4">
                <h1 className="text-gradient mb-2">Welcome Back</h1>
                {/* FIX: Changed text-muted to text-light opacity-75 for better visibility */}
                <p className="text-light opacity-75">Enter your credentials to access the system.</p>
              </div>
              
              {error && <div className="alert alert-danger" style={{background: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545', color: '#ff868e'}}>{error}</div>}
              
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white small fw-bold">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    placeholder="name@example.com"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-white small fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    placeholder="Enter your password"
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>
              </form>
              <div className="text-center mt-3">
                <span className="text-light opacity-75 small">No account? </span>
                <a href="/register" className="text-white fw-bold small" style={{textDecoration: 'none'}}>Create one</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;