import {
  Controller,
  Get,
  Res,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';
import { GetCurrentUserId } from '../auth/decorators';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ExcludeNullInterceptor)
  async createInscription(
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    if (file) {
      await this.fileService.upload(file, userId);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async getInscription(
    @GetCurrentUserId() userId: string,
    @Res() res: Response,
  ) {
    try {
      const filePath = await this.fileService.getFilePath(userId);
      res.download(filePath);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ExcludeNullInterceptor)
  async updateInscription(
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    if (file) {
      await this.fileService.upload(file, userId);
    }
  }
}
