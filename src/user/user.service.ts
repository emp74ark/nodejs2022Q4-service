import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from '../entities';
import { v4 as uuid } from 'uuid';
import { CreateUser } from './dto/create-user.dto';
import { UpdatePassword } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  findAll() {
    return this.dbService.getAllUsers();
  }

  async findOne(id: string) {
    const user = await this.dbService.getUserById(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }

  create(dto: CreateUser) {
    const user: User = {
      ...dto,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.dbService.addUser(user);

    return user;
  }

  async update(id: string, dto: UpdatePassword) {
    const user = await this.findOne(id);

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
    const user = await this.findOne(id);
    this.dbService.removeUser(user.id);
    return user;
  }
}
