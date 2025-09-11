import { Injectable } from '@nestjs/common';
import type { FieldAnalysisResponse, PuyoColor } from './field.types';

@Injectable()
export class FieldService {
  analyzeStub(): FieldAnalysisResponse {
    const rows = 12;
    const cols = 6;
    const emptyRow: PuyoColor[] = Array.from({ length: cols }, () => 0);
    const grid: PuyoColor[][] = Array.from({ length: rows }, () => [
      ...emptyRow,
    ]);
    // Mapping: 1:green, 2:red, 3:blue, 4:yellow, 5:purple, 9:ojama
    const pattern: PuyoColor[] = [2, 1, 3, 4, 5, 2];
    grid[rows - 1] = [...pattern];
    grid[rows - 2] = pattern.map((c) => (c === 2 ? 9 : c)) as PuyoColor[];
    // 任意のデバッグ出力（レスポンスには含めない）
    // eslint-disable-next-line no-console
    console.debug('[FieldService] analyzeStub called');
    return { grid, confidence: 1.0 };
  }
}
