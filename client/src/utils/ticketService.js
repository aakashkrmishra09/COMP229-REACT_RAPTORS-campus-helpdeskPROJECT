// src/utils/ticketService.js
import API_BASE_URL from "../config";
import { getToken } from "./authService";

export async function createTicket({ title, description, category, priority }) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ title, description, category, priority }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error || "Ticket creation failed");
  return data;
}

export async function fetchMyTickets() {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/api/tickets`, { // <- include /api
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });
  const text = await res.text(); // read as text first
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Unexpected backend response: ${text}`);
  }
  if (!res.ok) throw new Error(data.msg || data.error || "Failed to fetch tickets");
  return data;
}