import axios from 'axios';

// Ensure the base URL is correct for your backend server
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const loginUser = (email, password) => {
  return api.post('/users/login', { email, password });
};

export const getProfile = (token) => {
  return api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
