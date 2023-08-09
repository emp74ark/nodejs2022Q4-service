import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    // todo: check if artist exist
    return this.dbService.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.dbService.album.findMany({});
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique({
      where: { id: id },
    });
    if (!album) {
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

    return this.dbService.album.update({
      where: { id: album.id },
      data: updated,
    });
  }

  async remove(id: string) {
    const album = await this.findOne(id);

    // // change album id to null in all tracks
    // const tracks = await this.dbService.getAllTracks();
    // const filtered = tracks.filter((track) => track.albumId === id);
    // filtered.forEach((track) => {
    //   this.dbService.updateTrack({ ...track, albumId: null });
    // });
    //
    // // remove album from favs
    // this.dbService.removeAlbumFromFavorites(id);

    return this.dbService.album.delete({
      where: { id: album.id },
    }); // todo: cascade in schema
  }
}
