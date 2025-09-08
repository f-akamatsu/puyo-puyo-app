/**
 * 座標
 */
export class Coord {
  /**
   * 上隣、右隣、下隣、左隣、のCoordの配列
   */
  static readonly ARBL = [new Coord(0, 1), new Coord(1, 0), new Coord(0, -1), new Coord(-1, 0)];

  private readonly _x: number;
  private readonly _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /**
   * equals
   */
  equals(other: Coord): boolean {
    return this._x === other.x && this._y === other.y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
