import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6969/api',
  withCredentials: true, // so cookies (refresh token) are sent
});

export default api;
