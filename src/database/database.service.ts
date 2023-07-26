import { Injectable } from '@nestjs/common';
import { Album, Artist, Database, Track, User } from '../entities';

@Injectable()
export class DatabaseService {
  private database: Database = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
  };

  // Users
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

  // Artists
  async getAllArtists() {
    return this.database.artists;
  }

  async getArtistById(id: string) {
    return this.database.artists.find((artist) => artist.id === id);
  }

  async addArtist(dto: Artist) {
    this.database.artists.push(dto);
  }

  async updateArtist(dto: Artist) {
    this.database.artists = this.database.artists.map((artist) =>
      artist.id === dto.id ? { ...artist, ...dto } : artist,
    );
    return dto;
  }

  async removeArtist(id: string) {
    this.database.artists = this.database.artists.filter(
      (track) => track.id !== id,
    );
    return id;
  }

  // Tracks
  async getAllTracks() {
    return this.database.tracks;
  }

  async getTrackById(id: string) {
    return this.database.tracks.find((track) => track.id === id);
  }

  async addTrack(dto: Track) {
    this.database.tracks.push(dto);
  }

  async updateTrack(dto: Track) {
    this.database.tracks = this.database.tracks.map((track) =>
      track.id === dto.id ? { ...track, ...dto } : track,
    );
    return dto;
  }

  async removeTrack(id: string) {
    this.database.tracks = this.database.tracks.filter(
      (track) => track.id !== id,
    );
    return id;
  }

  // Albums
  async getAllAlbums() {
    return this.database.albums;
  }

  async getAlbumById(id: string) {
    return this.database.albums.find((album) => album.id === id);
  }

  async addAlbum(dto: Album) {
    this.database.albums.push(dto);
  }

  async updateAlbum(dto: Album) {
    this.database.albums = this.database.albums.map((albums) =>
      albums.id === dto.id ? { ...albums, ...dto } : albums,
    );
    return dto;
  }

  async removeAlbum(id: string) {
    this.database.albums = this.database.albums.filter(
      (album) => album.id !== id,
    );
    return id;
  }
}
