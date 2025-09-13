import type { PuyoColor } from '@/logic/domain/common/value-objects/puyo-color';
import type { FieldCoord } from '@/logic/domain/field/value-objects/field-coord';

// ドロップ（落下）イベント関連
export interface PuyoDroppedInterface {
  from: FieldCoord;
  to: FieldCoord;
  color: PuyoColor;
}

export interface DropEventInterface {
  dropped: PuyoDroppedInterface[];
}

// 消去イベント関連
export interface ConnectedPuyosErasedInterface {
  coords: FieldCoord[];
  color: PuyoColor;
}

export interface EraseEventInterface {
  erased: ConnectedPuyosErasedInterface[];
  ojamaErased: FieldCoord[];
}

// 連鎖イベント関連
export interface OneChainEventInterface {
  eraseEvent: EraseEventInterface;
  dropEvent: DropEventInterface;
}

export interface ChainEventInterface {
  chain: OneChainEventInterface[];
}
