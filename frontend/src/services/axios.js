import axios from 'axios';
import {useUserStore} from '@/stores/userStore';

const api = axios.create ({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
});

// WHEN RECEIVING 401 RESPONSE REFRESH TOKEN
api.interceptors.response.use (
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const userStore = useUserStore ();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!userStore.refreshToken) {
        userStore.logout ();
        return Promise.reject (error);
      }
      try {
        const resp = await api.post ('/auth/refresh', {
          refreshToken: userStore.refreshToken,
        });
        userStore.setToken (resp.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${resp.data.accessToken}`;
        return api (originalRequest);
      } catch (error) {
        userStore.logout ();
      }
    }
    return Promise.reject (error);
  }
);

export default api;
