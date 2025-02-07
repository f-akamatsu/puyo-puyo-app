import { Module } from '@nestjs/common';
import { CustomGraphQLModule } from './common/graphql/custom-graphql.module';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [
    // Common
    CustomGraphQLModule,
    // modules
    SampleModule,
  ],
})
export class AppModule {}
