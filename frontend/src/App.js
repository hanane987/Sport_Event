import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/register';  
import AdminHome from './pages/AdminHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route path="/register" element={<Register />} /> {}
        <Route path="/event/:id" element={<EventDetails />} /> {}
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
