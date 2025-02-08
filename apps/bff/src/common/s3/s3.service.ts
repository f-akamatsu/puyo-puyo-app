import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;
  private expiresIn: number;

  constructor(private config: ConfigService) {
    this.s3Client = new S3Client({
      endpoint: this.config.getOrThrow<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow<string>('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
      region: this.config.getOrThrow<string>('S3_REGION'),
    });
    this.bucket = this.config.getOrThrow<string>('S3_BUCKET');
    this.expiresIn = this.config.getOrThrow<number>('S3_EXPIRES_IN');
  }

  async getUploadUrl(fileName: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: this.expiresIn,
    });

    return url;
  }
}
