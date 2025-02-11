import { Injectable } from '@nestjs/common';
import { PuyoImageUploadUrl } from '../models/puyo-image.model';
import { S3Service } from 'src/common/s3/s3.service';
import { ulid } from 'ulid';
import { getFileExtension } from 'src/utils/file-util';

@Injectable()
export class PuyoImageService {
  constructor(private readonly s3Service: S3Service) {}

  async getPuyoImageUploadUrl(fileName: string): Promise<PuyoImageUploadUrl> {
    const id = ulid();
    const extension = getFileExtension(fileName);
    const fileId = extension ? `${id}.${extension}` : id;

    const uploadUrl = await this.s3Service.getUploadUrl(fileId);

    return { fileId, uploadUrl };
  }
}
