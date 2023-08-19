import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdatePassword } from './dto/update-password.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
  private logger = new LoggerService(UserService.name);

  constructor(private dbService: DatabaseService) {}

  findAll() {
    this.logger.debug('findAll');
    return this.dbService.user.findMany({});
  }

  async findOne(id: string) {
    this.logger.debug(`findOne: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  create(createUserDto: CreateUser) {
    this.logger.debug('create');
    return this.dbService.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        favAlbum: [],
        favArtist: [],
        favTrack: [],
      },
    });
  }

  async update(id: string, dto: UpdatePassword) {
    this.logger.debug(`update: ${id}`);
    const user = await this.findOne(id);

    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    } else {
      return this.dbService.user.update({
        where: { id },
        data: {
          password: dto.newPassword,
          version: user.version + 1,
        },
      });
    }
  }

  async remove(id: string) {
    this.logger.debug(`remove: ${id}`);
    const user = await this.findOne(id);
    return this.dbService.user.delete({ where: { id: user.id } });
  }
}
