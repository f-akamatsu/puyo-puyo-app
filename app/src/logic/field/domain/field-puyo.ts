import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { PuyoColor } from '../../common/domain/puyo-color';
import { Connect } from './connect';
import { Coord } from './coord';

/**
 * フィールド上のぷよ
 */
export class FieldPuyo {
  private readonly _puyoColor: PuyoColor;
  private _coord: Coord;
  private _connect: Connect;

  constructor(puyoColor: PuyoColor, coord: Coord) {
    if (puyoColor === PuyoColor.NONE)
      throw new Error('PuyoColor.NONEはFieldPuyoの色として設定できません。');

    this._puyoColor = puyoColor;
    this._coord = coord;
    this._connect = new Connect();
  }

  isSameCoord(coord: Coord): boolean {
    return this._coord.equals(coord);
  }

  toInterface(): FieldPuyoInterface {
    return {
      puyoColor: this._puyoColor.value,
      coord: this._coord.toInterface(),
      connect: this._connect.toInterface(),
    };
  }

  static from(fieldPuyoIF: FieldPuyoInterface): FieldPuyo {
    const puyoColor = PuyoColor.fromValue(fieldPuyoIF.puyoColor);
    const coord = new Coord(fieldPuyoIF.coord.x, fieldPuyoIF.coord.y);
    return new FieldPuyo(puyoColor, coord);
  }

  get coord(): Coord {
    return this._coord;
  }
}
