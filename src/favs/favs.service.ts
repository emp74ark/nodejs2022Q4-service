import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const favs = await this.dbService.getAllFavorites();

    // get all non-null tracks by id
    const tracks = await Promise.all(
      favs.tracks.map(async (id) => await this.dbService.getTrackById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    // get all non-null albums by id
    const albums = await Promise.all(
      favs.albums.map(async (id) => await this.dbService.getAlbumById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    // get all non-null artists by id
    const artists = await Promise.all(
      favs.artists.map(async (id) => await this.dbService.getArtistById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));
    console.log(artists);

    return {
      tracks,
      albums,
      artists,
    };
  }

  async addTrack(id: string) {
    const track = await this.dbService.getTrackById(id);
    if (track) {
      this.dbService.addTrackToFavorites(id);
      return this.dbService.getTrackById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeTrack(id: string) {
    this.dbService.removeTrackFromFavorites(id);
    return `Track with id ${id} was removed from favorites`;
  }

  async addAlbum(id: string) {
    const album = await this.dbService.getAlbumById(id);
    if (album) {
      this.dbService.addAlbumToFavorites(id);
      return this.dbService.getAlbumById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeAlbum(id: string) {
    this.dbService.removeAlbumFromFavorites(id);
    return `Album with id ${id} was removed from favorites`;
  }

  async addArtist(id: string) {
    const artist = await this.dbService.getArtistById(id);
    if (artist) {
      this.dbService.addArtistToFavorites(id);
      return this.dbService.getArtistById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeArtist(id: string) {
    this.dbService.removeArtistFromFavorites(id);
    return `Artist with id ${id} was removed from favorites`;
  }
}
