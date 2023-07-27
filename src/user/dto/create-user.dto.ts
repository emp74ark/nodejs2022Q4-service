import { CreateUserDto } from '../../entities';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUser implements CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
