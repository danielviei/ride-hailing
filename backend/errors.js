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

export class CastError extends Error {
  constructor (message) {
    super (message);
    this.name = 'CastError';
  }
}

export class NotFoundError extends Error {
  constructor (message) {
    super (message);
    this.name = 'NotFoundError';
  }
}
