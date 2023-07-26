import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DatabaseService) {}

  findAll() {
    return this.dbService.getAllFavorites();
  }

  addTrack(id: string) {
    this.dbService.addTrackToFavorites(id);
    return `Track with id ${id} added to favorites`;
  }

  removeTrack(id: string) {
    this.dbService.removeTrackFromFavorites(id);
    return `Track with id ${id} was removed from favorites`;
  }

  addAlbum(id: string) {
    this.dbService.addAlbumToFavorites(id);
    return `Album with id ${id} added to favorites`;
  }

  removeAlbum(id: string) {
    this.dbService.removeAlbumFromFavorites(id);
    return `Album with id ${id} was removed from favorites`;
  }

  addArtist(id: string) {
    this.dbService.addArtistToFavorites(id);
    return `Artist with id ${id} added to favorites`;
  }

  removeArtist(id: string) {
    this.dbService.removeArtistFromFavorites(id);
    return `Artist with id ${id} was removed from favorites`;
  }
}
