import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';
import { Artist } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private dbService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: uuid(),
    };
    return this.dbService.addArtist(newArtist);
  }

  findAll() {
    return this.dbService.getAllArtists();
  }

  async findOne(id: string) {
    const artist = await this.dbService.getArtistById(id);

    if (artist === undefined) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    const updated: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.dbService.updateArtist(updated);

    return updated;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    this.dbService.removeArtist(id);
    return artist;
  }
}
