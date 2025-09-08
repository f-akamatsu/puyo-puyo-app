import { PuyoColor } from '@/logic/domain/common/value-objects/puyo-color';
import { FieldCoord } from '../value-objects/field-coord';

/**
 * ぷよが落下した（ひとつのぷよ）
 */
export class PuyoDropped {
  /** 落ちる前の座標 */
  private readonly _from: FieldCoord;
  /** 落ちた先の座標 */
  private readonly _to: FieldCoord;
  /** 落ちたぷよの色 */
  private readonly _color: PuyoColor;

  constructor(from: FieldCoord, to: FieldCoord, color: PuyoColor) {
    this._from = from;
    this._to = to;
    this._color = color;
  }
}

/**
 * ぷよ落下イベント
 */
export class DropEvent {
  /** ぷよの落下 */
  private readonly _dropped: ReadonlyArray<PuyoDropped>;

  constructor(dropped: PuyoDropped[]) {
    this._dropped = Object.freeze([...dropped]);
  }
}
