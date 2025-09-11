// フロントエンドの PuyoColor に合わせた数値コード
// 0: empty, 1: green, 2: red, 3: blue, 4: yellow, 5: purple, 9: ojama
export type PuyoColor = 0 | 1 | 2 | 3 | 4 | 5 | 9;

export interface FieldAnalysisResponse {
  grid: PuyoColor[][];
  confidence: number;
}
