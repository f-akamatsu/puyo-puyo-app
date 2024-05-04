import { PuyoColor } from '../common/PuyoColor';
import { Coord } from './Coord';
import { StickTogether } from './StickTogether';

/**
 * フィールド上のぷよ
 */
export class FieldPuyo {
  private readonly _puyoColor: PuyoColor;
  private _coord: Coord;
  private _stickTogether: StickTogether;

  constructor(puyoColor: PuyoColor, coord: Coord) {
    if (puyoColor === PuyoColor.NONE)
      throw new Error('PuyoColor.NONEはFieldPuyoの色として設定できません。');

    this._puyoColor = puyoColor;
    this._coord = coord;
    this._stickTogether = new StickTogether();
  }
}
