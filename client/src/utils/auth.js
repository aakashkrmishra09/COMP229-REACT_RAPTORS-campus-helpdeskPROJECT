export function loginUser(email) {
  localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
}

export function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
}

export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

export function getUserEmail() {
  return localStorage.getItem("userEmail");
}