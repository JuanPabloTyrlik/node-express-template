import { HttpStatus } from '../../enums/http-status.enum';
import { HttpException } from '../../exceptions/http.exception';

export class UserNotFoundException extends HttpException {
  constructor(message = 'The user was not found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
