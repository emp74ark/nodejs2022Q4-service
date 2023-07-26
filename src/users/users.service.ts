import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, UpdatePasswordDto, User } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllUsers();
  }

  getOne(id: string) {
    return this.dbService.getUserById(id);
  }

  create(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      id: uuid(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return this.dbService.addUser(user);
  }

  update(id: string, dto: UpdatePasswordDto) {
    return this.dbService.updateUserPassword(id, dto);
  }

  remove(id: string) {
    return this.dbService.removeUser(id);
  }
}
