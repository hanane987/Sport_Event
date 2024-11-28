import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Main from './Main';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
        <Route path="/login" element={<Login />} /> {/* Add login route */}
        <Route path="/" element={<Main />} />  {/* Add Main route for the home page */}
      </Routes>
    </Router>
  );
}

export default App;
