import { Artist } from '../../entities';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  name: string;
  grammy: boolean;
}
