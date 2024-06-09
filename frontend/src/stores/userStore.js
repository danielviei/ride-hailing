import {defineStore} from 'pinia';

export const useUserStore = defineStore ('user', {
  state: () => ({
    user: JSON.parse (localStorage.getItem ('user')) || null,
    token: localStorage.getItem ('token') || null,
    refreshToken: localStorage.getItem ('refreshToken') || null,
  }),
  getters: {
    isAuthenticated () {
      return !!this.token;
    },
  },
  actions: {
    setUser (user) {
      this.user = user;
      localStorage.setItem ('user', JSON.stringify (user));
    },
    setToken (token) {
      this.token = token;
      localStorage.setItem ('token', token);
    },
    setRefreshToken (refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem ('refreshToken', refreshToken);
    },
    logout () {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem ('user');
      localStorage.removeItem ('token');
      localStorage.removeItem ('refreshToken');
    },
  },
});
