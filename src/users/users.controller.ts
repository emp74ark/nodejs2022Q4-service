import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return this.userService.update(id, body);
  }
}
