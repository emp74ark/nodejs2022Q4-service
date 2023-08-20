import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from './public.decorator';
import { UserService } from '../user/user.service';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { genSalt, hash } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  logIn(@Body() dto: LoginAuthDto) {
    return this.authService.logIn(dto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() dto: LoginAuthDto) {
    const pwdHash = async () => {
      const salt = await genSalt(10);
      return hash(dto.password, salt);
    };

    const user = await this.userService.create({
      login: dto.login,
      password: await pwdHash(),
    });

    return this.authService.signUp({
      id: user.id,
      login: user.login,
    });
  }

  @Public()
  @Post('refresh')
  refresh(@Body() dto: RefreshAuthDto) {
    return this.authService.refresh(dto);
  }
}
