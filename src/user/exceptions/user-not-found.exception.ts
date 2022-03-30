export class UserNotFoundException extends Error {
  constructor(message = 'The user was not found') {
    super(message);
  }
}
