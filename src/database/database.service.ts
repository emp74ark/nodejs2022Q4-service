import { Injectable } from '@nestjs/common';
import { Database, User } from '../entities';

@Injectable()
export class DatabaseService {
  private database: Database = {
    users: [],
  };

  async getAllUsers() {
    return this.database.users;
  }

  async getUserById(id: string) {
    return this.database.users.find((user) => user.id === id);
  }

  async addUser(dto: User) {
    return this.database.users.push(dto);
  }

  async updateUser(dto: User) {
    this.database.users = this.database.users.map((user) =>
      user.id === dto.id ? (user = dto) : user,
    );
  }

  async removeUser(id: string) {
    this.database.users = this.database.users.filter((user) => user.id !== id);
    return id;
  }
}
