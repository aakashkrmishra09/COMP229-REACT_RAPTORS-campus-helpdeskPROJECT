import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubmitTicket from "./pages/SubmitTicket";
import Tickets from "./pages/Tickets"; 

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Default route "/" goes to Login if not logged in, SubmitTicket if logged in */}
          <Route path="/" element={token ? <Navigate to="/submit-ticket" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/submit-ticket"
            element={
              <PrivateRoute>
                <SubmitTicket />
              </PrivateRoute>
            }
          />
           <Route
            path="/tickets"
            element={
              <PrivateRoute>
                <Tickets />
              </PrivateRoute>
            }
          />
          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;