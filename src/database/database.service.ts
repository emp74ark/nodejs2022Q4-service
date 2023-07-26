import { Injectable } from '@nestjs/common';
import { CreateUserDto, Database, UpdatePasswordDto, User } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DatabaseService {
  private database: Database = {
    users: [],
  };

  async getAllUsers() {
    return this.database.users;
  }

  async getUserById(id: string) {
    const user = this.database.users.find((user) => user.id === id);
    if (!user) {
      return 'User not found'; // todo: 404
    } else {
      return user; // todo: 200
    }
  }

  async addUser(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      id: uuid(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.database.users.push(user);

    return user; // todo: 201
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const user = this.database.users.find((user) => user.id === id);

    if (!user) {
      return 'User not found'; // todo: 404
    } else if (user.password !== dto.oldPassword) {
      return 'Wrong password'; // todo: 403
    } else {
      this.database.users = this.database.users.map((user) =>
        user.id === id
          ? (user = {
              ...user,
              password: dto.newPassword,
              version: user.version + 1,
              updatedAt: Date.now(),
            })
          : user,
      );
      return 'Password changed'; // todo: 200
    }
  }

  async removeUser(id: string) {
    const user = this.database.users.find((user) => user.id === id);

    if (!user) {
      return 'User not found'; // todo: 404
    }

    this.database.users = this.database.users.filter((user) => user.id !== id);
    return id; // todo: 204;
  }
}
