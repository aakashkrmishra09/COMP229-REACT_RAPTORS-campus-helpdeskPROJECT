import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    userType: "student"
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting registration:", form); // <-- log payload

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("Raw response:", res); // <-- log response object
    const text = await res.text();
    console.log("Raw response text:", text); // <-- log raw body

    if (!res.ok) {
      console.error("Registration failed:", text);
      alert("Registration failed. See console.");
      return;
    }

    const data = JSON.parse(text);
    console.log("Registration success data:", data); // <-- log parsed token
    localStorage.setItem("token", data.token);
    alert("Registration successful!");
  } catch (err) {
    console.error("Register error:", err);
  }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="userType" onChange={handleChange}>
          <option>student</option>
          <option>staff</option>
          <option>admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
