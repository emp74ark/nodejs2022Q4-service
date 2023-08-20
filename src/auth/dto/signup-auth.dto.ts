import { IsNotEmpty, IsString } from 'class-validator';

export class SignupAuthDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;
}
