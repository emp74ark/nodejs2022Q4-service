import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { AuthUser } from '../auth/auth-user.decorator';

@Controller('favs')
export class FavsController {
  constructor(private readonly favService: FavsService) {}

  @Get()
  findAll(@AuthUser() user: string) {
    return this.favService.findAll(user);
  }

  @Post('/track/:id')
  addTrack(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.addTrack(user, id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.removeTrack(user, id);
  }

  @Post('/album/:id')
  addAlbum(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.addAlbum(user, id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.removeAlbum(user, id);
  }

  @Post('/artist/:id')
  addArtist(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.addArtist(user, id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(
    @AuthUser() user: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favService.removeArtist(user, id);
  }
}
