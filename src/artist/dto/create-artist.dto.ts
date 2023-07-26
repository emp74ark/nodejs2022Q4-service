import { Artist } from '../../entities';
import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
