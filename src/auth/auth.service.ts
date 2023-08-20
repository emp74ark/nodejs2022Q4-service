import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { compare } from 'bcrypt';

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

    if (!user) {
      throw new UnauthorizedException();
    }

    const pwdMatch = await compare(dto.password, user.password);

    if (!pwdMatch) {
      throw new ForbiddenException();
    }

    const payload = { sub: user.id, login: user.login };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async signUp(dto: SignupAuthDto) {
    this.logger.debug(`signUp: ${dto.id}`);

    return { id: dto.id };
  }

  async refresh(dto: RefreshAuthDto) {
    return dto;
  }
}
