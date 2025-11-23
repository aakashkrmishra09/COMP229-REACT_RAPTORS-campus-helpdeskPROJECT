// src/pages/Tickets.js
import React, { useEffect, useState } from "react";
import { fetchMyTickets } from "../utils/ticketService";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMyTickets();
        setTickets(data);
      } catch (err) {
        setError(err.message || "Failed to load tickets");
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Tickets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tickets.length === 0 && <p>No tickets found.</p>}
      {tickets.map((t) => (
        <div key={t._id || t.id} style={{ background: "#fff", padding: 12, marginBottom: 10, borderRadius: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{t.ticketNumber || (`#${t.id || t._id}`)}</strong>
            <span>{t.priority}</span>
          </div>
          <div>{t.title}</div>
          <small>Category: {t.category}</small>
          <div style={{ marginTop: 8, color: "#555" }}>{t.status || "New"}</div>
        </div>
      ))}
    </div>
  );
}
