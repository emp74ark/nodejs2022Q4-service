import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService) {}

  getAll() {
    return this.dbService.getAllUsers();
  }

  getOne(id: string) {
    return this.dbService.getUserById(id);
  }

  create(user: User) {
    return this.dbService.addUser(user);
  }

  update(id: string, user: User) {
    return this.dbService.updateUser(id, user);
  }

  remove(id: string) {
    return this.dbService.removeUser(id);
  }
}
