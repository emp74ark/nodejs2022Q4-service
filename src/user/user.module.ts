import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [DatabaseModule],
})
export class UserModule {}
