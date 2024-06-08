import {useUserStore} from '@/stores/userStore';

function _makeFetchOptions (options = {}, auth = null) {
  const ret = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (options.headers) {
    ret.headers = {
      ...ret.headers,
      ...options.headers,
    };
  }

  if (auth) {
    ret.headers.Authorization = `Bearer ${auth.token}`;
  }

  return ret;
}

export function makeAuthFetchOptions (options = {}) {
  const token = useUserStore ().token;
  return _makeFetchOptions (options, {token});
}
