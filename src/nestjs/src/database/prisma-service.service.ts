import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['info', 'warn'],
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: 'postgresql://postgres:zeca1234@localhost:5432/pdsacademy',
        },
      },
    });
  }
  async onApplicationShutdown(signal: string) {
    console.log(`Stopping application with signal ${signal}`);
    await this.$disconnect();
  }
}
