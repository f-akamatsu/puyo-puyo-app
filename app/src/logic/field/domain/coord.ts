import { CoordInterface } from '@/interfaces/FieldInterfaces';

/**
 * 座標クラス
 */
export class Coord {
  static readonly X_SIZE = 6;
  static readonly Y_SIZE = 13;

  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    if (x < 0 || x >= Coord.X_SIZE) throw new Error(`xに指定できる範囲は0~5です。: [x=${x}]`);
    if (y < 0 || y >= Coord.Y_SIZE) throw new Error(`yに指定できる範囲は0~12です。: [y=${y}]`);

    this._x = x;
    this._y = y;
  }

  /**
   * 足す
   */
  add(addendCoord: Coord): Coord {
    return new Coord(this._x + addendCoord.x, this._y + addendCoord.y);
  }

  /**
   * y足す
   */
  addY(addendY: number): Coord {
    return new Coord(this._x, this._y + addendY);
  }

  /**
   * 幽霊か
   */
  isGhost(): boolean {
    return this._y === Coord.Y_SIZE - 1;
  }

  /**
   * equals
   */
  equals(coord: Coord): boolean {
    return this._x === coord.x && this._y === coord.y;
  }

  toInterface(): CoordInterface {
    return { x: this._x, y: this._y };
  }

  static from(coordIF: CoordInterface): Coord {
    return new Coord(coordIF.x, coordIF.y);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
