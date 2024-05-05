import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldPuyo } from './field-puyo';
import { FieldCoord } from './field-coord';
import { Connect } from './connect';
import { Optional } from 'typescript-optional';
import { Coord } from '@/logic/common/domain/coord';

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
    this.removeFieldPuyo(newFieldPuyo.fieldCoord);
    this._fieldPuyos.push(newFieldPuyo);
    this.setConnect();
  }

  /**
   * ぷよを取り除く
   */
  removeFieldPuyo(fieldCoord: FieldCoord): void {
    const removedFiledPuyos = this._fieldPuyos.filter((p) => !p.isSameCoord(fieldCoord));
    this._fieldPuyos = removedFiledPuyos;
    this.setConnect();
  }

  /**
   * 各ぷよのくっつきを設定する
   */
  private setConnect(): void {
    this._fieldPuyos.forEach((fieldPuyo) => {
      if (fieldPuyo.fieldCoord.isGhost()) {
        // 対象がゆうれいぷよの場合は全方向くっつきなし
        fieldPuyo.connect = new Connect();
        return;
      }

      if (!fieldPuyo.puyoColor.isColor) {
        // 対象が色ぷよでない場合は全方向くっつきなし
        fieldPuyo.connect = new Connect();
        return;
      }

      const connectArray: boolean[] = [];
      Coord.URDL.forEach((urdlCoord) => {
        try {
          const neighborCoord = fieldPuyo.fieldCoord.add(urdlCoord);
          const neighborFieldPuyo = this.getFieldPuyo(neighborCoord);

          if (neighborFieldPuyo.fieldCoord.isGhost()) {
            // 隣がゆうれいぷよの場合、その隣とはくっつきなし
            connectArray.push(false);
            return;
          }

          const connect = fieldPuyo.puyoColor === neighborFieldPuyo.puyoColor;
          connectArray.push(connect);
        } catch (e) {
          // ・addで範囲外の座標になった場合(＝隣が壁の場合)
          // ・getFieldPuyoで隣のぷよがなかった場合(＝隣にぷよがない場合)
          // その隣とはくっつきなし
          connectArray.push(false);
        }
      });

      fieldPuyo.connect = new Connect(
        connectArray[0],
        connectArray[1],
        connectArray[2],
        connectArray[3]
      );
    });
  }

  /**
   * 指定の座標のぷよを取得
   */
  private getFieldPuyo(fieldCoord: FieldCoord): FieldPuyo {
    const fieldPuyo = Optional.ofNullable(
      this._fieldPuyos.find((p) => {
        return p.isSameCoord(fieldCoord);
      })
    );
    return fieldPuyo.get();
  }

  /**
   *
   */
  toInterface(): FieldPuyoInterface[] {
    return this._fieldPuyos.map((fieldPuyo) => fieldPuyo.toInterface());
  }

  static from(fieldPuyosIF: FieldPuyoInterface[]): Field {
    const fieldPuyos = fieldPuyosIF.map((fieldPuyoIF) => FieldPuyo.from(fieldPuyoIF));
    return new Field(fieldPuyos);
  }
}
