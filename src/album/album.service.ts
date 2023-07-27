import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      ...createAlbumDto,
      id: uuid(),
    };
    this.dbService.addAlbum(album);
    return album;
  }

  findAll() {
    return this.dbService.getAllAlbums();
  }

  async findOne(id: string) {
    const album = await this.dbService.getAlbumById(id);
    if (album === undefined) {
      throw new NotFoundException();
    } else {
      return album;
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const updated = {
      ...album,
      ...updateAlbumDto,
    };
    this.dbService.updateAlbum(updated);
    return updated;
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    this.dbService.removeAlbum(id);

    // change album id to null in all tracks
    const tracks = await this.dbService.getAllTracks();
    const filtered = tracks.filter((track) => track.albumId === id);
    filtered.forEach((track) => {
      this.dbService.updateTrack({ ...track, albumId: null });
    });

    // remove album from favs
    this.dbService.removeAlbumFromFavorites(id);

    return album;
  }
}
