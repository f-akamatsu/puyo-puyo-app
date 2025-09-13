export interface FieldPuyoInterface {
  puyoColor: number;
  fieldCoord: FieldCoordInterface;
  connect: ConnectInterface;
}

export interface FieldCoordInterface {
  x: number;
  y: number;
}

export interface ConnectInterface {
  above: boolean;
  right: boolean;
  below: boolean;
  left: boolean;
}

// 連鎖ごとのスコア明細
export interface ChainScoreInterface {
  /** 消去数合計（基礎点は popNum×10 で計算可能） */
  popNum: number;
  /** ボーナス値（1以上） */
  bonus: number;
}

// 得点（UIとロジックのインターフェース）
export interface ScoreInterface {
  total: number;
  /** 連鎖ごとのスコア明細 */
  chains: ChainScoreInterface[];
}
