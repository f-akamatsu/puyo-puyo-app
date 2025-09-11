import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FieldAnalysisResponseDto, UploadImageDto } from './dto/analysis.dto';
import { FieldService } from './field.service';
import type { FieldAnalysisResponse } from './field.types';

@ApiTags('fields')
@Controller('fields')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '盤面画像ファイル', type: UploadImageDto })
  @ApiOkResponse({ type: FieldAnalysisResponseDto })
  analyzeField(
    @UploadedFile() _file?: Express.Multer.File,
  ): FieldAnalysisResponse {
    return this.fieldService.analyzeStub();
  }
}
