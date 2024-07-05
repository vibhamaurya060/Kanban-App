// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kanban-app-w133.onrender.com', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
