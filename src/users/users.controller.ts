import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdatePassword } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.getOne(id);
    if (user === undefined) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  @Post()
  create(@Body() body: CreateUser) {
    return this.userService.create(body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.getOne(id);
    if (user === undefined) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  put(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePassword,
  ) {
    return this.userService.update(id, body);
  }
}
