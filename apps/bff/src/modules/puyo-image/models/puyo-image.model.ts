import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PuyoImageUploadUrl {
  @Field((_type) => String)
  fileId: string;

  @Field((_type) => String)
  uploadUrl: string;
}
