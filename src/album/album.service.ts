import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AlbumService {
  private logger = new LoggerService(AlbumService.name);

  constructor(private dbService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    this.logger.debug('create');
    const artist = createAlbumDto.artistId
      ? await this.dbService.artist.findUnique({
          where: { id: createAlbumDto.artistId },
        })
      : null;

    if (!artist) {
      delete createAlbumDto.artistId;
    }

    return this.dbService.album.create({ data: createAlbumDto });
  }

  findAll() {
    this.logger.debug('findAll');
    return this.dbService.album.findMany({});
  }

  async findOne(id: string) {
    this.logger.debug(`findOne: ${id}`);
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
    this.logger.debug(`update: ${id}`);
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
    this.logger.debug(`remove: ${id}`);
    const album = await this.findOne(id);
    return this.dbService.album.delete({
      where: { id: album.id },
    });
  }
}
