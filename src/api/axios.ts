import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7070/api',
  withCredentials: true, // so cookies (refresh token) are sent
  headers: { 'Content-Type': 'application/json' },
});

export default api;
