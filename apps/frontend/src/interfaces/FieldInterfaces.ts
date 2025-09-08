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

// 得点（UIとロジックのインターフェース）
// 最小構成。将来的に chains などを拡張予定。
export interface ScoreInterface {
  total: number;
}
