import { Artist } from '../../entities';
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
