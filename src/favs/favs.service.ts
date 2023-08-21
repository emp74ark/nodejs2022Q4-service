import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class FavsService {
  private logger = new LoggerService(FavsService.name);

  constructor(private dbService: DatabaseService) {}

  async findAll(userId: string) {
    this.logger.debug('findAll');
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const tracks = await this.dbService.track.findMany({
      where: { id: { in: user.favTrack } },
    });

    const albums = await this.dbService.album.findMany({
      where: { id: { in: user.favAlbum } },
    });

    const artists = await this.dbService.artist.findMany({
      where: { id: { in: user.favArtist } },
    });

    return { tracks, albums, artists };
  }

  async addTrack(userId: string, id: string) {
    this.logger.debug(`addTrack: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const track = await this.dbService.track.findUnique({
      where: { id },
    });

    if (track) {
      await this.dbService.user.update({
        where: { id: user.id },
        data: { favTrack: { push: track.id } },
        select: {
          favTrack: true,
        },
      });

      return track;
    }

    throw new UnprocessableEntityException();
  }

  async removeTrack(userId: string, id: string) {
    this.logger.debug(`removeTrack: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const favTrack = user.favTrack.filter((track) => track !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favTrack },
    });
  }

  async addAlbum(userId: string, id: string) {
    this.logger.debug(`addAlbum: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const album = await this.dbService.album.findUnique({
      where: { id },
    });

    if (album) {
      await this.dbService.user.update({
        where: { id: user.id },
        data: { favAlbum: { push: album.id } },
        select: {
          favAlbum: true,
        },
      });

      return album;
    }

    throw new UnprocessableEntityException();
  }

  async removeAlbum(userId: string, id: string) {
    this.logger.debug(`removeAlbum: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const favAlbum = user.favAlbum.filter((album) => album !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favAlbum },
    });
  }

  async addArtist(userId: string, id: string) {
    this.logger.debug(`addArtist: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const artist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (artist) {
      await this.dbService.user.update({
        where: { id: user.id },
        data: { favArtist: { push: artist.id } },
        select: {
          favArtist: true,
        },
      });

      return artist;
    }

    throw new UnprocessableEntityException();
  }

  async removeArtist(userId: string, id: string) {
    this.logger.debug(`removeArtist: ${id}`);
    const user = await this.dbService.user.findUnique({
      where: { id: userId },
    });

    const favArtist = user.favArtist.filter((artist) => artist !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favArtist },
    });
  }
}
