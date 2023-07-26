import { UpdatePasswordDto } from '../../entities';
import { IsNotEmpty } from 'class-validator';

export class UpdatePassword implements UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
