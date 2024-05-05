import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldPuyo } from './field-puyo';
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

  /**
   * ぷよをセット
   */
  setFieldPuyo(newFieldPuyo: FieldPuyo): void {
    this.removeFieldPuyo(newFieldPuyo.coord);
    this._fieldPuyos.push(newFieldPuyo);
  }

  /**
   * ぷよを取り除く
   */
  removeFieldPuyo(coord: Coord): void {
    const removedFiledPuyos = this._fieldPuyos.filter((p) => !p.isSameCoord(coord));
    this._fieldPuyos = removedFiledPuyos;
  }

  toInterface(): FieldPuyoInterface[] {
    return this._fieldPuyos.map((fieldPuyo) => fieldPuyo.toInterface());
  }

  static from(fieldPuyosIF: FieldPuyoInterface[]): Field {
    const fieldPuyos = fieldPuyosIF.map((fieldPuyoIF) => FieldPuyo.from(fieldPuyoIF));
    return new Field(fieldPuyos);
  }
}
