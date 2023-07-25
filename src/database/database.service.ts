import { Injectable } from '@nestjs/common';
import { Database, User } from '../entities';

@Injectable()
export class DatabaseService {
  private database: Database = {
    users: [],
  };

  getAllUsers() {
    return this.database.users;
  }

  getUserById(id: string) {
    return this.database.users.find((user) => user.id === id);
  }

  addUser(dto: User) {
    // todo: generate dto
    this.database.users.push(dto);
    return dto;
  }

  updateUser(id: string, dto: User) {
    // todo: generate dto
    const updated = this.database.users.map((user) =>
      user.id === id ? (user = { ...user, ...dto }) : user,
    );
    this.database.users = updated;
    return dto;
  }

  removeUser(id: string) {
    this.database.users = this.database.users.filter((user) => user.id !== id);
    return id;
  }
}
