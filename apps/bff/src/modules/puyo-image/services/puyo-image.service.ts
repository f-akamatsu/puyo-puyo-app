import { Injectable } from '@nestjs/common';
import { PuyoImageUploadUrl } from '../models/puyo-image.model';
import { S3Service } from 'src/common/s3/s3.service';
import { ulid } from 'ulid';

@Injectable()
export class PuyoImageService {
  constructor(private readonly s3Service: S3Service) {}

  async getPuyoImageUploadUrl(): Promise<PuyoImageUploadUrl> {
    const fileId = ulid();
    const uploadUrl = await this.s3Service.getUploadUrl(fileId);
    return { fileId, uploadUrl };
  }
}
