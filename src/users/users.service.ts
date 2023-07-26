import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, UpdatePasswordDto, User } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllUsers();
  }

  async getOne(id: string) {
    const user = await this.dbService.getUserById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  create(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      id: uuid(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.dbService.addUser(user);

    return user;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.getOne(id);

    if (user.password !== dto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    } else {
      const updated: User = {
        ...user,
        password: dto.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      };

      this.dbService.updateUser(updated);

      return updated;
    }
  }

  async remove(id: string) {
    const user = await this.getOne(id);
    this.dbService.removeUser(user.id);
    return user;
  }
}
