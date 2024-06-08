import api from '@/services/axios';

export async function getCars (page = 1, limit = 10) {
  const resp = await api.get (`/cars?page=${page}&limit=${limit}`);
  return resp.data;
}
