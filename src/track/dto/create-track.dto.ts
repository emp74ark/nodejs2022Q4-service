import { Track } from '../../entities';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto implements Omit<Track, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  artistId: string;

  @IsOptional()
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
