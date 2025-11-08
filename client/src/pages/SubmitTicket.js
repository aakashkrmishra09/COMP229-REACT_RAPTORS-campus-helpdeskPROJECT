import React from "react";

export default function SubmitTicket() {
  return (
    <div style={{ fontFamily: "Arial", background: "#f4f4f4", minHeight: "100vh", padding: "30px" }}>
      <form style={{ maxWidth: "500px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2>Submit a Support Ticket</h2>

        <label>Title</label>
        <input type="text" required style={{ width: "100%", padding: "10px", margin: "10px 0" }} />

        <label>Description</label>
        <textarea rows="5" required style={{ width: "100%", padding: "10px", margin: "10px 0" }}></textarea>

        <label>Category</label>
        <select style={{ width: "100%", padding: "10px", margin: "10px 0" }}>
          <option>IT Support</option>
          <option>Library</option>
          <option>Housing</option>
          <option>Other</option>
        </select>

        <label>Priority</label>
        <select style={{ width: "100%", padding: "10px", margin: "10px 0" }}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" style={{ background: "#28a745", color: "white", border: "none", padding: "10px", width: "100%", borderRadius: "5px" }}>Submit Ticket</button>
      </form>
    </div>
  );
}
