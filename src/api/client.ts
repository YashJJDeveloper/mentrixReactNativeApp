import axios from 'axios';
import {getItem} from '../utils/storage';

const client = axios.create({
  baseURL: 'https://scos-exercise-backend.onrender.com',
  timeout: 20000, // ✅ increased for iOS + Render cold start
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ REQUEST INTERCEPTOR (Attach Token)
client.interceptors.request.use(
  async config => {
    try {
      const session = await getItem<any>('session');

      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch (error) {
      console.log('Token attach error:', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

// ✅ RESPONSE INTERCEPTOR (Better Debugging)
client.interceptors.response.use(
  response => response,
  error => {
    console.log('API ERROR:', error.response?.data || error.message || error);
    return Promise.reject(error);
  },
);

export default client;
