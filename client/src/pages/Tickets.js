// src/pages/Tickets.js
import React, { useEffect, useState } from "react";
import { getTickets, updateTicket, deleteTicket } from "../utils/TicketStore";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: "", priority: "Medium" });

  // Load tickets on mount
  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setForm({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
      priority: ticket.priority,
    });
  };

  const handleSave = () => {
    const updated = updateTicket({ ...editingTicket, ...form });
    setTickets(getTickets());
    setEditingTicket(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      setTickets(getTickets());
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Tickets</h2>
      {tickets.length === 0 && <p>No tickets found.</p>}
      {tickets.map((t) => (
        <div key={t.id} style={{ background: "#fff", padding: 12, marginBottom: 10, borderRadius: 6 }}>
          {editingTicket?.id === t.id ? (
            <div>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <div style={{ marginTop: 8 }}>
                <button onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
                <button onClick={() => setEditingTicket(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{`#${t.id}`}</strong>
                <span>{t.priority}</span>
              </div>
              <div>{t.title}</div>
              <small>Category: {t.category}</small>
              <div style={{ marginTop: 8, color: "#555" }}>{t.status}</div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleEdit(t)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
