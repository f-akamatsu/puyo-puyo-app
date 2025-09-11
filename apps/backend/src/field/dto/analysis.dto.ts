import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file!: any;
}

export class FieldAnalysisResponseDto {
  @ApiProperty({
    description:
      '盤面の色コード2次元配列 [12][6]（常に固定サイズ）。0:empty, 1:green, 2:red, 3:blue, 4:yellow, 5:purple, 9:ojama',
    example: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [2, 1, 3, 4, 5, 2],
      [9, 1, 3, 4, 5, 2],
    ],
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'integer',
        enum: [0, 1, 2, 3, 4, 5, 9],
      },
    },
  })
  grid!: number[][];

  @ApiProperty({ example: 0.98, description: '全体の平均信頼度（0.0-1.0）' })
  confidence!: number;
}
