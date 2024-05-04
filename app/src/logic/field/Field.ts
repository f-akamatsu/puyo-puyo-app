import { FieldPuyo } from './FieldPuyo';

/**
 * フィールド
 * これを集約ルート的に扱う
 */
export class Field {
  private _fieldPuyos: FieldPuyo[];

  constructor() {
    this._fieldPuyos = [];
  }
}
