import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { Track } from '../entities';

@Injectable()
export class TrackService {
  constructor(private dbService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const album = createTrackDto.albumId
      ? await this.dbService.album.findUnique({
          where: { id: createTrackDto.albumId },
        })
      : null;

    if (!album) {
      delete createTrackDto.albumId;
    }

    const artist = createTrackDto.artistId
      ? await this.dbService.artist.findUnique({
          where: { id: createTrackDto.artistId },
        })
      : null;

    if (!artist) {
      delete createTrackDto.artistId;
    }

    return this.dbService.track.create({ data: createTrackDto });
  }

  findAll() {
    return this.dbService.track.findMany({});
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({
      where: { id: id },
    });

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    const updated: Track = {
      ...track,
      ...updateTrackDto,
    };

    return this.dbService.track.update({
      where: { id: updated.id },
      data: updated,
    });
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return this.dbService.track.delete({
      where: { id: track.id },
    }); // todo: cascade in scheme
    // // remove track from favs
    // this.dbService.removeTrackFromFavorites(id);
  }
}
