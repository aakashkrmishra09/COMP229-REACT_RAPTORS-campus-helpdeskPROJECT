// src/pages/SubmitTicket.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTicket } from "../utils/TicketStore";

export default function SubmitTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const newTicket = addTicket(form); // add ticket for logged-in user
      alert(`Ticket submitted! Ticket Number: ${newTicket.id}`);

      // Reset form
      setForm({ title: "", description: "", category: "", priority: "Medium" });

      // Redirect to tickets list
      navigate("/tickets");
    } catch (err) {
      console.error(err);
      alert(err.message); // shows "User not logged in" if token missing
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Submit a Ticket</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
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
