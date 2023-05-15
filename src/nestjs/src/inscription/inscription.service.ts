import { Inject, Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import {
  CreateInscriptionUseCase,
  FindInscriptionByInscriptionIdUseCase,
  GetInscriptionUseCase,
  UploadFileUseCase,
} from '@pds/academy-core/inscription/application';
import { UniqueEntityId } from '@pds/academy-core/@seedwork/domain';

@Injectable()
export class InscriptionService {

  @Inject(GetInscriptionUseCase.UseCase)
  private getInscriptionUseCase: GetInscriptionUseCase.UseCase;

  @Inject(FindInscriptionByInscriptionIdUseCase.UseCase)
  private findInscriptionByInscriptionIdUseCase: FindInscriptionByInscriptionIdUseCase.UseCase;

  @Inject(CreateInscriptionUseCase.UseCase)
  private createInscriptionUseCase: CreateInscriptionUseCase.UseCase;

  @Inject(UploadFileUseCase.UseCase)
  private updateInscriptionUseCase: UploadFileUseCase.UseCase;

  constructor(private fileService: FileService) {}

  async createInscription(userId: string, file: Express.Multer.File) {
    const pathToFile = await this.fileService.upload(file, userId);
    return this.createInscriptionUseCase.execute({
      userId,
      documentPath: pathToFile,
    });
  }

  async updateInscription(userId: string, file: Express.Multer.File) {
    const pathToFile = await this.fileService.upload(file, userId);
    await this.updateInscriptionUseCase.execute({ userId, path: pathToFile });
  }

  async getInscription(userId: string) {
    return {
      output: await this.getInscriptionUseCase.execute({ userId }),
      filePath: await this.fileService.getFilePath(userId),
    };
  }

  async getInscriptionFilePathByInscriptionId(inscriptionId: string) {
    const output = await this.findInscriptionByInscriptionIdUseCase.execute({
      inscriptionId,
    });
    const idValue =
      output.userId instanceof UniqueEntityId ? output.id : output.userId;
    return this.fileService.getFilePath(idValue);
  }
}
