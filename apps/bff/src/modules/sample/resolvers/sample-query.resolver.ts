import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class SampleQueryResolver {
  @Query(() => String)
  sample(): string {
    return 'hello, sample query.';
  }
}
