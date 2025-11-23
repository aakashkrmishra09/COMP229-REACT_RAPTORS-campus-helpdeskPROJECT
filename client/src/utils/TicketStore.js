// src/utils/ticketstore.js

// Get the current logged-in user's token
function getUserKey() {
  const token = localStorage.getItem("token"); // make sure login sets this
  if (!token) throw new Error("User not logged in");
  return `tickets_${token}`;
}

// Get all tickets for the logged-in user
export function getTickets() {
  const key = getUserKey();
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Add a new ticket
export function addTicket(ticket) {
  const key = getUserKey();
  const tickets = getTickets();
  const newTicket = { ...ticket, id: Date.now(), status: "New" };
  tickets.push(newTicket);
  localStorage.setItem(key, JSON.stringify(tickets));
  return newTicket;
}

// Update an existing ticket
export function updateTicket(updated) {
  const key = getUserKey();
  const tickets = getTickets().map(t => (t.id === updated.id ? { ...t, ...updated } : t));
  localStorage.setItem(key, JSON.stringify(tickets));
  return updated;
}

// Delete a ticket
export function deleteTicket(id) {
  const key = getUserKey();
  const tickets = getTickets().filter(t => t.id !== id);
  localStorage.setItem(key, JSON.stringify(tickets));
}
