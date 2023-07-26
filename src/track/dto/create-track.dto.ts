import { Track } from '../../entities';
import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto implements Omit<Track, 'id'> {
  @IsNotEmpty()
  name: string;

  artistId: string;
  albumId: string;

  @IsNotEmpty()
  duration: number;
}
