import { Module } from '@nestjs/common';
import { SampleQueryResolver } from './resolvers/sample-query.resolver';

@Module({
  imports: [],
  exports: [],
  providers: [SampleQueryResolver],
})
export class SampleModule {}
