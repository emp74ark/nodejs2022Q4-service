import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, UpdatePasswordDto } from '../entities';

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
    return this.dbService.addUser(dto);
  }

  update(id: string, dto: UpdatePasswordDto) {
    return this.dbService.updateUserPassword(id, dto);
  }

  remove(id: string) {
    return this.dbService.removeUser(id);
  }
}
