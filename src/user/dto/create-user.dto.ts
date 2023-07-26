import { CreateUserDto } from '../../entities';
import { IsNotEmpty } from 'class-validator';

export class CreateUser implements CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
