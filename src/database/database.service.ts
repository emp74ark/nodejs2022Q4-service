import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '../entities';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        database: {
          url: DATABASE_URL,
        },
      },
    });
  }
}
