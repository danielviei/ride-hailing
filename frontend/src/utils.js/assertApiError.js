export const _assertApiError = status =>
  status < 200 || status >= 300 || status === undefined || status === null;

export async function assertApiError (resp) {
  console.log(resp.status);
  if (!_assertApiError (resp.status)) return;

  const error = new Error (`[API ERROR] (${resp.url})`);

  // Attach extra info to the error object.

  throw Object.assign ({}, error, {
    data: resp.data,
    status: resp.status,
    url: resp.url,
  });
}

export default assertApiError;
