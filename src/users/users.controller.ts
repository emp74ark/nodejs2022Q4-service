import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../entities';
import { UsersService } from './users.service';
import { CreateUser } from "./dto/create-user.dto";
import { UpdatePassword } from "./dto/update-password.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.getOne(id);
  }

  @Post()
  create(@Body() body: CreateUser) {
    return this.userService.create(body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.remove(id);
  }

  @Put(':id')
  put(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() body: UpdatePassword) {
    return this.userService.update(id, body);
  }
}
