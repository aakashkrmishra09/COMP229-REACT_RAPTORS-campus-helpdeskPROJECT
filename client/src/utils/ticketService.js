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

  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error || "Failed to fetch tickets");
  return data;
}
