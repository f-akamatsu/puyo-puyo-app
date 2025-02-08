import { Module } from '@nestjs/common';
import { S3Module } from 'src/common/s3/s3.module';
import { PuyoImageResolver } from './resolvers/puyo-image-query.resolver';
import { PuyoImageService } from './services/puyo-image.service';

@Module({
  imports: [S3Module],
  exports: [],
  providers: [PuyoImageResolver, PuyoImageService],
})
export class PuyoImageModule {}
