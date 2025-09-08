import { PuyoColor } from '@/logic/domain/common/value-objects/puyo-color';
import { FieldCoord } from '../value-objects/field-coord';

/**
 *
 * 色ぷよの連結（ひとかたまり）が消去された
 */
export class ConnectedPuyosErased {
  /** 消去される座標 */
  private readonly _coords: ReadonlyArray<FieldCoord>;
  /** 消去される色 */
  private readonly _color: PuyoColor;

  constructor(coords: FieldCoord[], color: PuyoColor) {
    this._coords = Object.freeze([...coords]);
    this._color = color;
  }

  get coords(): ReadonlyArray<FieldCoord> {
    return this._coords;
  }

  /** 消去された色 */
  get color(): PuyoColor {
    return this._color;
  }
}

/**
 * ぷよ消去イベント
 */
export class EraseEvent {
  /** 色ぷよの消去 */
  private readonly _erased: ReadonlyArray<ConnectedPuyosErased>;
  /** おじゃまの消去 */
  private readonly _ojamaErased: ReadonlyArray<FieldCoord>;

  constructor(erased: ConnectedPuyosErased[], ojamaErased: FieldCoord[]) {
    this._erased = Object.freeze([...erased]);
    this._ojamaErased = Object.freeze([...ojamaErased]);
  }

  /**
   * 消去があったか
   */
  get isErased(): boolean {
    return this._erased.length > 0;
  }

  /**
   * 消去された時の連結数
   */
  get connectNums(): number[] {
    return this._erased.map((e) => e.coords.length);
  }

  /**
   * 消去されたぷよの色の数
   */
  get colorNum(): number {
    const colorValueSet = new Set<PuyoColor>();
    this._erased.forEach((e) => colorValueSet.add(e.color));
    return colorValueSet.size;
  }
}
