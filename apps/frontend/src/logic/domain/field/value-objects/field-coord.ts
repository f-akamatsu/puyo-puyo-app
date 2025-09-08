import { FieldCoordInterface } from '@/interfaces/FieldInterfaces';
import { Coord } from '@/logic/domain/common/value-objects/coord';

/**
 * Field座標
 */
export class FieldCoord extends Coord {
  static readonly X_SIZE = 6;
  static readonly Y_SIZE = 13;

  constructor(x: number, y: number) {
    if (x < 0 || x >= FieldCoord.X_SIZE) throw new Error(`xに指定できる範囲は0~5です。: [x=${x}]`);
    if (y < 0 || y >= FieldCoord.Y_SIZE) throw new Error(`yに指定できる範囲は0~12です。: [y=${y}]`);

    super(x, y);
  }

  /**
   * 足す
   */
  add(addendCoord: Coord): FieldCoord {
    return new FieldCoord(this.x + addendCoord.x, this.y + addendCoord.y);
  }

  /**
   * y足す
   */
  addY(addendY: number): FieldCoord {
    return new FieldCoord(this.x, this.y + addendY);
  }

  /**
   * 幽霊か
   */
  isGhost(): boolean {
    return this.y === FieldCoord.Y_SIZE - 1;
  }

  /**
   *
   */
  toInterface(): FieldCoordInterface {
    return { x: this.x, y: this.y };
  }

  /**
   *
   */
  static from(fieldCoordIF: FieldCoordInterface): FieldCoord {
    return new FieldCoord(fieldCoordIF.x, fieldCoordIF.y);
  }
}
