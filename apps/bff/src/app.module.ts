import { Module } from '@nestjs/common';
import { CustomGraphQLModule } from './common/graphql/custom-graphql.module';
import { SampleModule } from './modules/sample/sample.module';
import { ConfigModule } from '@nestjs/config';
import { PuyoImageModule } from './modules/puyo-image/puyo-image.module';

@Module({
  imports: [
    // Common
    ConfigModule.forRoot({ isGlobal: true }),
    CustomGraphQLModule,
    // modules
    SampleModule,
    PuyoImageModule,
  ],
})
export class AppModule {}
