import { Injectable } from '@nestjs/common';
import { Database, User } from '../entities';

@Injectable()
export class DatabaseService {
  private database: Database = {
    users: [],
    artists: [],
    tracks: [],
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

  async getAllArtists() {
    return this.database.artists;
  }

  async getArtistById(id: string) {
    return this.database.artists.find((track) => track.id === id);
  }

  async addArtist(dto: Artist) {
    this.database.artists.push(dto);
  }

  async updateArtist(dto: Artist) {
    this.database.artists = this.database.artists.map((track) =>
      track.id === dto.id ? { ...track, dto } : track,
    );
  }

  async removeArtist(id: string) {
    this.database.artists = this.database.artists.filter(
      (track) => track.id !== id,
    );
    return id;
  }
}
