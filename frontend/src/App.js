import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/register';  // Fixed import name (capitalized 'R' to match the filename)
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/event/:id" element={<EventDetails />} /> {/* Event details route */}
      </Routes>
    </Router>
  );
}

export default App;
