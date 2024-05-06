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
    const removedFiledPuyos = this._fieldPuyos.filter((p) => !p.fieldCoord.equals(fieldCoord));
    this._fieldPuyos = removedFiledPuyos;
    this.setConnect();
  }

  /**
   * 連鎖開始
   */
  startChain(): void {
    // 1. 落とす
    this.drop();

    // 2. 消す
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
      Coord.ARBL.forEach((urdlCoord) => {
        try {
          const neighborCoord = fieldPuyo.fieldCoord.add(urdlCoord);
          const neighborFieldPuyoOptional = this.getFieldPuyo(neighborCoord);

          if (neighborFieldPuyoOptional.isEmpty()) {
            // getFieldPuyoで隣のぷよがなかった場合(＝隣にぷよがない場合)、その隣とはくっつきなし
            connectArray.push(false);
            return;
          }

          const neighborFieldPuyo = neighborFieldPuyoOptional.get();

          if (neighborFieldPuyo.fieldCoord.isGhost()) {
            // 隣がゆうれいぷよの場合、その隣とはくっつきなし
            connectArray.push(false);
            return;
          }

          const connect = fieldPuyo.puyoColor === neighborFieldPuyo.puyoColor;
          connectArray.push(connect);
        } catch (e) {
          // ・addで範囲外の座標になった場合(＝隣が壁の場合)、その隣とはくっつきなし
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
  private getFieldPuyo(fieldCoord: FieldCoord): Optional<FieldPuyo> {
    const fieldPuyo = Optional.ofNullable(
      this._fieldPuyos.find((p) => {
        return p.fieldCoord.equals(fieldCoord);
      })
    );
    return fieldPuyo;
  }

  /**
   * 浮いているぷよを落とす
   */
  private drop(): void {
    for (let x = 0; x < FieldCoord.X_SIZE; x++) {
      for (let y = 0; y < FieldCoord.Y_SIZE - 1; y++) {
        // 下の段から順にチェック。
        // ぷよがある場合はスキップ。
        // ぷよがない場合は、それより上にぷよがあるかを確認し、あれば落としてくる。
        // 最上段はそれより上にぷよはないため、チェック不要。
        const toFieldCoord = new FieldCoord(x, y);
        const toFieldPuyoOptional = this.getFieldPuyo(toFieldCoord);

        if (toFieldPuyoOptional.isPresent()) {
          continue;
        }

        let fromFieldCoord = new FieldCoord(x, y);
        let fromFieldPuyoOptional: Optional<FieldPuyo>;

        do {
          fromFieldCoord = fromFieldCoord.addY(1);
          fromFieldPuyoOptional = this.getFieldPuyo(fromFieldCoord);
        } while (fromFieldCoord.y < FieldCoord.Y_SIZE - 1 && fromFieldPuyoOptional.isEmpty());

        if (fromFieldPuyoOptional.isEmpty()) {
          continue;
        }

        const fromFieldPuyo = fromFieldPuyoOptional.get();
        fromFieldPuyo.fieldCoord = toFieldCoord;
        fromFieldPuyo.connect = new Connect();
      }
    }
  }

  /**
   *
   */
  toInterface(): FieldPuyoInterface[] {
    return this._fieldPuyos.map((fieldPuyo) => fieldPuyo.toInterface());
  }

  /**
   *
   */
  static from(fieldPuyosIF: FieldPuyoInterface[]): Field {
    const fieldPuyos = fieldPuyosIF.map((fieldPuyoIF) => FieldPuyo.from(fieldPuyoIF));
    return new Field(fieldPuyos);
  }
}
