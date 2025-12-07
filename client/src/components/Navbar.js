import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg'; 

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="rounded-circle me-3 border border-light" />
          <span className="fw-bold" style={{letterSpacing: '1px'}}>REACT <span style={{color: '#ff6600'}}>RAPTORS</span></span>
        </Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item"><Link className="nav-link text-light mx-2" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-2">Logout</button></li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-sm btn-primary px-4" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;