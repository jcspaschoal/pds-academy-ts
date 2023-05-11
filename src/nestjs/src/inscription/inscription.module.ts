import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FileService } from './file.service';
import { InscriptionController } from './inscription.controller';
import { INSCRIPTION_PROVIDERS } from './inscription.providers';
import { InscriptionService } from './inscription.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    FileService,
    InscriptionService,
    ...Object.values(INSCRIPTION_PROVIDERS.REPOSITORIES),
    ...Object.values(INSCRIPTION_PROVIDERS.INSCRIPTION_USE_CASES),
  ],
  controllers: [InscriptionController],
})
export class InscriptionModule {}
