import axios from 'axios';

// Render/prod me VITE_API_URL env se aayega (ex: https://your-backend.onrender.com)
// Local me .env file wala VITE_API_URL ya ye localhost fallback use hoga.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5454";
export const DEPLOYED_URL = import.meta.env.VITE_API_URL || "https://zosh-bazzar-backend.onrender.com"
// change api

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});