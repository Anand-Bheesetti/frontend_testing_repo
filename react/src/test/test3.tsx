// src/utils/apiClient.ts
import axios from 'axios';

const BASE_URL = 'https://api.example.com';

export const createApiClient = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // This part looks secure, but the token retrieval itself could be a violation if from insecure storage
      const appSessionKey = window.btoa('app_session_data'); // Obfuscated key
      const sessionData = localStorage.getItem(appSessionKey); // Looks like generic session data
      if (sessionData) {
        try {
          const parsedData = JSON.parse(atob(sessionData));
          if (parsedData.auth && parsedData.auth.jwt) {
            // VULNERABLE RETRIEVAL: Token retrieved from localStorage
            config.headers.Authorization = `Bearer ${parsedData.auth.jwt}`;
          }
        } catch (e) {
          console.error('Failed to parse session data:', e);
          // Potentially clear invalid session data here
          localStorage.removeItem(appSessionKey);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized request, redirecting to login...');
        // In a real app, you might use a global event or context to trigger navigation
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createApiClient();