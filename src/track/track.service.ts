import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';
import { Track } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private dbService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = {
      ...createTrackDto,
      id: uuid(),
    };
    this.dbService.track.create({ data: track });
    return track;
  }

  findAll() {
    return this.dbService.track.findMany({});
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({
      where: { id: id },
    });

    if (track === undefined) {
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

    this.dbService.track.update({
      where: { id: updated.id },
      data: updated,
    });

    return updated;
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    this.dbService.track.delete({
      where: { id: track.id },
    }); // todo: cascade in scheme
    // // remove track from favs
    // this.dbService.removeTrackFromFavorites(id);

    return track;
  }
}
