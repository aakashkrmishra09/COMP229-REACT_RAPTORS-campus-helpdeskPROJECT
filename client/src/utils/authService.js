import API_BASE_URL from "../config";

export async function registerUser({ username, email, password, userType }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, userType }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = text; }

    if (!res.ok) {
      console.error("Register failed, raw response:", text);
      throw new Error(data.msg || data.error || "Registration failed");
    }

    if (data.token) localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
}

export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = text; }

    if (!res.ok) throw new Error(data.msg || data.error || "Login failed");
    if (data.token) localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
