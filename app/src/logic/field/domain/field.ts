import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldPuyo } from './field-puyo';
import { PuyoColor } from '@/logic/common/domain/puyo-color';
import { Coord } from './coord';

/**
 * フィールド
 * これを集約ルート的に扱う
 */
export class Field {
  private _fieldPuyos: FieldPuyo[];

  constructor(fieldPuyos: FieldPuyo[]) {
    this._fieldPuyos = fieldPuyos;
  }

  setFieldPuyo(newFieldPuyo: FieldPuyo): void {
    this._fieldPuyos.push(newFieldPuyo);
  }

  toInterface(): FieldPuyoInterface[] {
    return this._fieldPuyos.map((fieldPuyo) => fieldPuyo.toInterface());
  }

  static from(fieldPuyosIF: FieldPuyoInterface[]): Field {
    const fieldPuyos = fieldPuyosIF.map((fieldPuyoIF) => FieldPuyo.from(fieldPuyoIF));
    return new Field(fieldPuyos);
  }
}
