import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial", padding: "40px", textAlign: "center", background: "#f9fafb", minHeight: "100vh" }}>
      <h1>Campus Helpdesk System</h1>
      <p>Welcome! Get help easily from IT or campus support staff.</p>

      <nav style={{ margin: "20px 0" }}>
        <Link to="/register" style={{ margin: "0 10px", textDecoration: "none", padding: "10px 20px", background: "#007bff", color: "white", borderRadius: "5px" }}>Register</Link>
        <Link to="/login" style={{ margin: "0 10px", textDecoration: "none", padding: "10px 20px", background: "#007bff", color: "white", borderRadius: "5px" }}>Login</Link>
        <Link to="/submit-ticket" style={{ margin: "0 10px", textDecoration: "none", padding: "10px 20px", background: "#007bff", color: "white", borderRadius: "5px" }}>Submit Ticket</Link>
        <Link to="/tickets" style={{ margin: "0 10px", textDecoration: "none", padding: "10px 20px", background: "#007bff", color: "white", borderRadius: "5px" }}>View Tickets</Link>
      </nav>
    </div>
  );
}
