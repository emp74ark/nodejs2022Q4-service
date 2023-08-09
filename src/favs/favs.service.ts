import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DatabaseService) {}

  async sessionUser() {
    return await this.dbService.user.findFirst({});
  }

  async findAll() {
    const user = await this.sessionUser();
    return {
      tracks: user.favTrack,
      albums: user.favAlbum,
      artist: user.favArtist,
    };
  }

  async addTrack(id: string) {
    const user = await this.sessionUser();

    const track = await this.dbService.track.findUnique({
      where: { id },
    });

    if (track) {
      return this.dbService.user.update({
        where: { id: user.id },
        data: { favTrack: { push: track.id } },
        select: {
          favTrack: true,
        },
      });
    }

    throw new UnprocessableEntityException();
  }

  async removeTrack(id: string) {
    const user = await this.sessionUser();
    const favTrack = user.favTrack.filter((track) => track !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favTrack },
    });
  }

  async addAlbum(id: string) {
    const user = await this.sessionUser();

    const album = await this.dbService.album.findUnique({
      where: { id },
    });

    if (album) {
      return this.dbService.user.update({
        where: { id: user.id },
        data: { favAlbum: { push: album.id } },
        select: {
          favAlbum: true,
        },
      });
    }

    throw new UnprocessableEntityException();
  }

  async removeAlbum(id: string) {
    const user = await this.sessionUser();
    const favAlbum = user.favAlbum.filter((album) => album !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favAlbum },
    });
  }

  async addArtist(id: string) {
    const user = await this.sessionUser();

    const artist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (artist) {
      return this.dbService.user.update({
        where: { id: user.id },
        data: { favArtist: { push: artist.id } },
        select: {
          favArtist: true,
        },
      });
    }

    throw new UnprocessableEntityException();
  }

  async removeArtist(id: string) {
    const user = await this.sessionUser();
    const favArtist = user.favArtist.filter((artist) => artist !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favArtist },
    });
  }
}
