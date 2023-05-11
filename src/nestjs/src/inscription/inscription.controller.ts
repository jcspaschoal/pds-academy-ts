import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcludeNullInterceptor } from '../@share/interceptors/exclude-null.interceptor';
import { GetCurrentUserId, Roles } from '../auth/decorators';
import { InscriptionService } from './inscription.service';
import {
  InscriptionCollectionPresenter,
  InscriptionPresenter,
} from './presenter/inscription.presenter';
import { RolesGuard } from '../auth/guards';
import {
  BulkStatusUpdateUseCase,
  ListInscriptionUseCase,
} from '@pds/academy-core/inscription/application';
import { SearchInscriptionDto } from './dto';
import { BulkUpdateDto } from './dto/bulk-update.dto';

@Controller('inscription')
export class InscriptionController {
  @Inject(ListInscriptionUseCase.UseCase)
  private listInscriptionUseCase: ListInscriptionUseCase.UseCase;

  @Inject(BulkStatusUpdateUseCase.UseCase)
  private bulkStatusUpdateUseCase: BulkStatusUpdateUseCase.UseCase;

  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ExcludeNullInterceptor)
  async createInscription(
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InscriptionPresenter> {
    const output = await this.inscriptionService.createInscription(
      userId,
      file,
    );
    return new InscriptionPresenter(output);
  }

  @Get('file')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async getInscriptionFile(
    @GetCurrentUserId() userId: string,
    @Res() res: Response,
  ) {
    try {
      const { filePath } = await this.inscriptionService.getInscription(userId);
      res.download(filePath);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ExcludeNullInterceptor)
  async getInscription(@GetCurrentUserId() userId: string) {
    const { output } = await this.inscriptionService.getInscription(userId);
    return new InscriptionPresenter(output);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ExcludeNullInterceptor)
  async updateInscription(
    @GetCurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.inscriptionService.updateInscription(userId, file);
  }

  @Put('/admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(ExcludeNullInterceptor)
  async bulkUpdateAnalysedInscriptions(
    @GetCurrentUserId() userId: string,
    @Body() bulkUpdateDto: BulkUpdateDto,
  ) {
    return await this.bulkStatusUpdateUseCase.execute({
      userId: userId,
      inscriptions: bulkUpdateDto.items,
    });
  }

  @Get('/admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(ExcludeNullInterceptor)
  async getAllPendentInscriptions(
    @Query() searchParams: SearchInscriptionDto,
  ): Promise<InscriptionCollectionPresenter> {
    const output = await this.listInscriptionUseCase.execute(searchParams);
    return new InscriptionCollectionPresenter(output);
  }

  @Get('/admin/file/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(ExcludeNullInterceptor)
  async getInscriptionFileAdmin(
    @Res() res: Response,
    @Param('id') inscriptionId: string,
  ): Promise<void> {
    const filePath =
      await this.inscriptionService.getInscriptionFilePathByInscriptionId(
        inscriptionId,
      );
    try {
      res.download(filePath);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }
}
