import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      {!token && <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <Link to="/submit-ticket" style={{ marginRight: "10px" }}>Submit Ticket</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}
