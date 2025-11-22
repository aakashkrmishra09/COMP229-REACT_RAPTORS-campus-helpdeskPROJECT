import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Check login status from localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", background: "#0d6efd", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>

            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/submit-ticket" style={{ color: "white", textDecoration: "none" }}>
              Submit Ticket
            </Link>

            <Link to="/tickets" style={{ color: "white", textDecoration: "none" }}>
              View Tickets
            </Link>

            <button 
              onClick={handleLogout} 
              style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
