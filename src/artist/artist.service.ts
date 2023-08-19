import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';
import { Artist } from '../entities';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ArtistService {
  private logger = new LoggerService(ArtistService.name);

  constructor(private dbService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    this.logger.debug('create');
    return this.dbService.artist.create({ data: createArtistDto });
  }

  findAll() {
    this.logger.debug('findAll');
    return this.dbService.artist.findMany({});
  }

  async findOne(id: string) {
    this.logger.debug(`findOne: ${id}`);
    const artist = await this.dbService.artist.findUnique({
      where: { id: id },
    });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    this.logger.debug(`update: ${id}`);
    if (!id) throw new BadRequestException();
    const artist = await this.findOne(id);

    const updated: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    return this.dbService.artist.update({
      where: { id: updated.id },
      data: updated,
    });
  }

  async remove(id: string) {
    this.logger.debug(`remove: ${id}`);
    const artist = await this.findOne(id);
    return this.dbService.artist.delete({
      where: { id: artist.id },
    });
  }
}
