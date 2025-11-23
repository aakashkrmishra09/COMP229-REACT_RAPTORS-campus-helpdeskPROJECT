// src/pages/SubmitTicket.js
import React, { useState } from "react";
import { getToken } from "../utils/authService";
import API_BASE_URL from "../config";

export default function SubmitTicket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert("You must be logged in to submit a ticket.");
      return;
    }

    console.log("Submitting ticket:", form);

    try {
      const res = await fetch(`${API_BASE_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, // send token to backend
        },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("Ticket submission failed:", text);
        alert("Ticket submission failed. See console.");
        return;
      }

      const data = JSON.parse(text);
      console.log("Ticket created successfully:", data);
      alert(`Ticket submitted! Ticket Number: ${data.ticketNumber}`);
      setForm({ title: "", description: "", category: "", priority: "Medium" }); // reset form
    } catch (err) {
      console.error("Submit ticket error:", err);
    }
  };

  return (
    <div>
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}
