import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitTicket from "./pages/SubmitTicket";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-ticket" element={<SubmitTicket />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
}

export default App;
