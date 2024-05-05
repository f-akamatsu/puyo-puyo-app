import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { PuyoColor } from '../../common/domain/puyo-color';
import { Connect } from './connect';
import { FieldCoord } from './field-coord';

/**
 * フィールド上のぷよ
 */
export class FieldPuyo {
  private readonly _puyoColor: PuyoColor;
  private _fieldCoord: FieldCoord;
  private _connect: Connect;

  constructor(puyoColor: PuyoColor, fieldCoord: FieldCoord) {
    this._puyoColor = puyoColor;
    this._fieldCoord = fieldCoord;
    this._connect = new Connect();
  }

  /**
   *
   */
  toInterface(): FieldPuyoInterface {
    return {
      puyoColor: this._puyoColor.value,
      fieldCoord: this._fieldCoord.toInterface(),
      connect: this._connect.toInterface(),
    };
  }

  static from(fieldPuyoIF: FieldPuyoInterface): FieldPuyo {
    const puyoColor = PuyoColor.fromValue(fieldPuyoIF.puyoColor);
    const fieldCoord = new FieldCoord(fieldPuyoIF.fieldCoord.x, fieldPuyoIF.fieldCoord.y);
    return new FieldPuyo(puyoColor, fieldCoord);
  }

  get puyoColor(): PuyoColor {
    return this._puyoColor;
  }

  get fieldCoord(): FieldCoord {
    return this._fieldCoord;
  }

  set connect(connect: Connect) {
    this._connect = connect;
  }
}
