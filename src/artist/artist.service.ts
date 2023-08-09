import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';
import { Artist } from '../entities';

@Injectable()
export class ArtistService {
  constructor(private dbService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.dbService.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.dbService.artist.findMany({});
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({
      where: { id: id },
    });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
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
    const artist = await this.findOne(id);
    return this.dbService.artist.delete({
      where: { id: artist.id },
    }); // todo: cascade in schema

    // // change artist id to null in all tracks
    // const tracks = await this.dbService.getAllTracks();
    // const filteredTracks = tracks.filter((track) => track.artistId === id);
    // filteredTracks.forEach((track) => {
    //   this.dbService.updateTrack({ ...track, artistId: null });
    // });
    //
    // // change album id to null in all tracks
    // const albums = await this.dbService.getAllAlbums();
    // const filteredAlbums = albums.filter((album) => album.artistId === id);
    // filteredAlbums.forEach((album) => {
    //   this.dbService.updateAlbum({ ...album, artistId: null });
    // });
    //
    // // remove artist from favs
    // this.dbService.removeArtistFromFavorites(id);
  }
}
