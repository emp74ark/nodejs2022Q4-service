import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdatePassword } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  findAll() {
    return this.dbService.user.findMany({});
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  create(createUserDto: CreateUser) {
    return this.dbService.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
      },
    });
  }

  async update(id: string, dto: UpdatePassword) {
    const user = await this.findOne(id);

    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    } else {
      const updated = {
        ...user,
        password: dto.newPassword,
        version: user.version + 1,
      };

      return this.dbService.user.update({
        where: { id: updated.id },
        data: updated,
      });
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.dbService.user.delete({ where: { id: user.id } });
  }
}
