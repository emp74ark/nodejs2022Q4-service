import { Track } from '../../entities';

export class CreateTrackDto implements Omit<Track, 'id'> {
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}
