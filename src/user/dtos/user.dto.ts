import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class User {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsEmail()
  email: string;
}
