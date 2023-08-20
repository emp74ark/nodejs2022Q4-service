import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @IsString()
  login: string;
}
