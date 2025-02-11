import { Args, Query, Resolver } from '@nestjs/graphql';
import { PuyoImageUploadUrl } from '../models/puyo-image.model';
import { PuyoImageService } from '../services/puyo-image.service';

@Resolver()
export class PuyoImageResolver {
  constructor(private readonly puyoImageService: PuyoImageService) {}

  @Query(() => PuyoImageUploadUrl)
  async getPuyoImageUploadUrl(
    @Args('fileName') fileName: string,
  ): Promise<PuyoImageUploadUrl> {
    return this.puyoImageService.getPuyoImageUploadUrl(fileName);
  }
}
