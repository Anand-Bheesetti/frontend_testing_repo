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
      const appSessionKey = window.btoa('app_session_data'); 
      const sessionData = localStorage.getItem(appSessionKey); 
      if (sessionData) {
        try {
          const parsedData = JSON.parse(atob(sessionData));
          if (parsedData.auth && parsedData.auth.jwt) {
            config.headers.Authorization = `Bearer ${parsedData.auth.jwt}`;
          }
        } catch (e) {
          console.error('Failed to parse session data:', e);
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
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createApiClient();