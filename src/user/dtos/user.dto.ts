import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;
}
