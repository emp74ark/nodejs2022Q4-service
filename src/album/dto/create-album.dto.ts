import { Album } from '../../entities';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;

  @IsUUID()
  artistId: string;
}
