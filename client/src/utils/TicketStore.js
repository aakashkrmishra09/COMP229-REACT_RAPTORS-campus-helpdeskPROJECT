export function getTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}

export function addTicket(ticket) {
  const tickets = getTickets();
  tickets.push({ ...ticket, id: Date.now() });
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

export function updateTicket(updated) {
  let tickets = getTickets();
  tickets = tickets.map(t =>
    t.id === updated.id ? updated : t
  );
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

export function deleteTicket(id) {
  let tickets = getTickets();
  tickets = tickets.filter(t => t.id !== id);
  localStorage.setItem("tickets", JSON.stringify(tickets));
}
