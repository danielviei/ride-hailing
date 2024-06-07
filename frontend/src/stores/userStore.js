import {defineStore} from 'pinia';

export const useUserStore = defineStore ('user', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
  }),
  getters: {
    isAuthenticated () {
      return !!this.token;
    },
  },
  actions: {
    setUser (user) {
      this.user = user;
    },
    setToken (token) {
      this.token = token;
    },
    setRefreshToken (refreshToken) {
      this.refreshToken = refreshToken;
    },
  },
});
