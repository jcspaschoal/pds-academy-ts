import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FileService } from './file.service';
import { InscriptionController } from './inscription.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FileService],
  controllers: [InscriptionController],
})
export class InscriptionModule {}
