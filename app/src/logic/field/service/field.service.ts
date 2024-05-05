import { CoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Field } from '../domain/field';
import { FieldPuyo } from '../domain/field-puyo';
import { Coord } from '../domain/coord';

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
    coordIF: CoordInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const coord = Coord.from(coordIF);

    field.removeFieldPuyo(coord);

    return field.toInterface();
  }
}
