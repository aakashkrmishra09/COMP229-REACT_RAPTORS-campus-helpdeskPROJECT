import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div style={{ fontFamily: "Arial", background: "#eef2f3", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form style={{ background: "white", padding: "30px", borderRadius: "10px", width: "300px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2>Register</h2>
        <label>Full Name</label>
        <input type="text" required style={{ width: "100%", padding: "8px", margin: "10px 0" }} />

        <label>Email</label>
        <input type="email" required style={{ width: "100%", padding: "8px", margin: "10px 0" }} />

        <label>Password</label>
        <input type="password" required style={{ width: "100%", padding: "8px", margin: "10px 0" }} />

        <label>Role</label>
        <select style={{ width: "100%", padding: "8px", margin: "10px 0" }}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="agent">Support Agent</option>
        </select>

        <button type="submit" style={{ background: "#007bff", color: "white", border: "none", padding: "10px", width: "100%", borderRadius: "5px" }}>Sign Up</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
