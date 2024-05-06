import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Field } from '../domain/field';
import { FieldPuyo } from '../domain/field-puyo';
import { FieldCoord } from '../domain/field-coord';

/**
 * フィールドサービス
 */
export class FieldService {
  /**
   * フィールドにぷよをセット
   */
  setFieldPuyo(
    fieldPuyosIF: FieldPuyoInterface[],
    newFieldPuyoIF: FieldPuyoInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const newFieldPuyo = FieldPuyo.from(newFieldPuyoIF);

    field.setFieldPuyo(newFieldPuyo);

    return field.toInterface();
  }

  /**
   * フィールドからぷよを取り除く
   */
  removeFieldPuyo(
    fieldPuyosIF: FieldPuyoInterface[],
    fieldCoordIF: FieldCoordInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const fieldCoord = FieldCoord.from(fieldCoordIF);

    field.removeFieldPuyo(fieldCoord);

    return field.toInterface();
  }

  /**
   * 連鎖開始
   */
  startChain(fieldPuyosIF: FieldPuyoInterface[]): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);

    field.startChain();

    return field.toInterface();
  }
}
