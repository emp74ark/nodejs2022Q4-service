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
    const newTrack = {
      ...createTrackDto,
      id: uuid(),
    };
    this.dbService.addTrack(newTrack);
    return newTrack;
  }

  findAll() {
    return this.dbService.getAllTracks();
  }

  async findOne(id: string) {
    const track = await this.dbService.getTrackById(id);

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

    this.dbService.updateTrack(updated);

    return updated;
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    this.dbService.removeTrack(id);

    // remove track from favs
    this.dbService.removeTrackFromFavorites(id);

    return track;
  }
}
