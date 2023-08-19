import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { Track } from '../entities';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TrackService {
  private logger = new LoggerService(TrackService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    this.logger.debug('create');
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
    this.logger.debug('findAll');
    return this.dbService.track.findMany({});
  }

  async findOne(id: string) {
    this.logger.debug(`findOne: ${id}`);
    const track = await this.dbService.track.findUnique({
      where: { id: id },
    });

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    this.logger.debug(`update: ${id}`);
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
    this.logger.debug(`remove: ${id}`);
    const track = await this.findOne(id);
    return this.dbService.track.delete({
      where: { id: track.id },
    });
  }
}
