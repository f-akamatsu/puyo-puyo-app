import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FieldModule } from './field/field.module';

@Module({
  imports: [FieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
