import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): User {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() body: User): User {
    return this.userService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.userService.remove(id);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: User): User {
    return this.userService.update(id, body);
  }
}
