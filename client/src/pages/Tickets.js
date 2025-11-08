import React from "react";

export default function Tickets() {
  return (
    <div style={{ fontFamily: "Arial", background: "#f4f4f4", minHeight: "100vh", padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>My Submitted Tickets</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ticket ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Priority</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#101</td>
            <td>WiFi not working</td>
            <td>IT Support</td>
            <td>High</td>
            <td>Open</td>
          </tr>
          <tr>
            <td>#102</td>
            <td>Library login issue</td>
            <td>Library</td>
            <td>Medium</td>
            <td>Closed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
