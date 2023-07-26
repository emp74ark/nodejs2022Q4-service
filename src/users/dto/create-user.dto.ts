import { CreateUserDto } from '../../entities';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser implements CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
