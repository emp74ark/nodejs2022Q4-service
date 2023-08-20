import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new LoggerService('Auth');

  constructor(
    private dbService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async logIn(dto: LoginAuthDto) {
    this.logger.debug(`logIn: ${dto.login}`);

    const user = await this.dbService.user.findFirst({
      where: { login: dto.login },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, login: user.login, version: user.version };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async logOut(dto: LogoutAuthDto) {
    this.logger.debug(`logOut: ${dto.login}`);

    return 'logout';
  }
}
