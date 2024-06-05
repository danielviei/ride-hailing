export class ValidationError extends Error {
  constructor (message) {
    super (message);
    this.name = 'ValidationError';
  }
}

export class DuplicateError extends Error {
  constructor (message) {
    super (message);
    this.name = 'DuplicateError';
  }
}

export class ServerError extends Error {
  constructor (message) {
    super (message);
    this.name = 'ServerError';
  }
}

export class AuthenticationError extends Error {
  constructor (message) {
    super (message);
    this.name = 'AuthenticationError';
  }
}
