import { PuyoColor } from '@/logic/domain/common/value-objects/puyo-color';
import { FieldCoord } from '../value-objects/field-coord';
import type { DropEventInterface, PuyoDroppedInterface } from '@/interfaces/EventInterfaces';

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

  /** 落ちる前の座標 */
  get from(): FieldCoord {
    return this._from;
  }

  /** 落ちた先の座標 */
  get to(): FieldCoord {
    return this._to;
  }

  /** 色 */
  get color(): PuyoColor {
    return this._color;
  }

  toInterface(): PuyoDroppedInterface {
    return { from: this._from, to: this._to, color: this._color };
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

  /** 落下の配列 */
  get dropped(): ReadonlyArray<PuyoDropped> {
    return this._dropped;
  }

  toInterface(): DropEventInterface {
    return { dropped: this._dropped.map((d) => d.toInterface()) };
  }
}
