import api from '@/services/axios';
import {useUserStore} from '@/stores/userStore';
import {assertApiError} from '@/utils.js/assertApiError';

export async function login (email, password) {
  const userStore = useUserStore ();
  const resp = await api.post ('/auth/token', {email, password});
  userStore.setToken (resp.data.token);
  userStore.setRefreshToken (resp.data.refreshToken);
  userStore.setUser (resp.data.user);
}

export async function registerUser (body) {
  const resp = await api.post ('/users', body);
  await assertApiError (resp);
}
