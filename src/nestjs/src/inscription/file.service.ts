import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createWriteStream } from 'fs';
import { readdir } from 'fs/promises';
import { join, extname } from 'path';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('File is mandatory');
    }
    const allowedExtensions = ['.pdf', '.docx'];
    const fileExt = extname(file.originalname);
    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException('File type not supported');
    }
    const fileName = `${userId}${fileExt}`;
    const filePath = join(__dirname, '..', '..', '..', 'files', fileName);
    const fileStream = createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => {
        reject(error);
      });
      fileStream.on('finish', () => {
        resolve(fileName);
      });
      fileStream.write(file.buffer);
      fileStream.end();
    });
  }
  async getFilePath(user_id: string): Promise<string> {
    const fileNames = await readdir(join(__dirname, '..', '..', '..', 'files'));
    const matchingFileName = fileNames.find((fileName) =>
      fileName.startsWith(`${user_id}.`),
    );
    if (!matchingFileName) {
      throw new NotFoundException('File not found');
    }
    return join(__dirname, '..', '..', '..', 'files', matchingFileName);
  }

  async getInscriptionFileByUserID() {

  }

}
