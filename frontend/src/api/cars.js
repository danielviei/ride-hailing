import api from '@/services/axios';
import {makeAuthFetchOptions} from '@/utils.js/makeFetchOptions';
import {assertApiError} from '@/utils.js/assertApiError';

export async function getCars (page = 1, limit = 10) {
  const resp = await api.get (`/cars?page=${page}&limit=${limit}`);
  return resp.data;
}

export async function postCar (carData) {
  const resp = await api.post ('/cars', carData, makeAuthFetchOptions ());
  await assertApiError (resp);
  return resp.data;
}

export async function changeCarStatus (carId, status) {
  const resp = await api.patch (
    `/cars/${carId}`,
    {status},
    makeAuthFetchOptions ()
  );
  await assertApiError (resp);
  return resp.data;
}

export async function getCarById (carId) {
  const resp = await api.get (`/cars/${carId}`);
  await assertApiError (resp);
  return resp.data;
}

export async function deleteCar (carId) {
  const resp = await api.delete (`/cars/${carId}`, makeAuthFetchOptions ());
  await assertApiError (resp);
  return resp.data;
}

export async function updateCar (carId, carData) {
  const resp = await api.put (
    `/cars/${carId}`,
    carData,
    makeAuthFetchOptions ()
  );
  await assertApiError (resp);
  return resp.data;
}
