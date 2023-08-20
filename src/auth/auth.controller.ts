import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  logIn(@Body() dto: LoginAuthDto) {
    return this.authService.logIn(dto);
  }

  @Post('logout')
  logOut(@Body() dto: LogoutAuthDto) {
    return this.authService.logOut(dto);
  }
}
