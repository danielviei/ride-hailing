import api from '@/services/axios';
import {useUserStore} from '@/stores/userStore';

export async function login (email, password) {
  const userStore = useUserStore ();
  const resp = await api.post ('/auth/token', {email, password});
  userStore.setToken (resp.data.token);
  userStore.setRefreshToken (resp.data.refreshToken);
  userStore.setUser (resp.data.user);
}
