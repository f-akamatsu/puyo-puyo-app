import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Field } from '../domain/field';
import { FieldPuyo } from '../domain/field-puyo';

export class FieldService {
  setFieldPuyo(
    fieldPuyosIF: FieldPuyoInterface[],
    newFieldPuyoIF: FieldPuyoInterface
  ): FieldPuyoInterface[] {
    const field = Field.from(fieldPuyosIF);
    const newFieldPuyo = FieldPuyo.from(newFieldPuyoIF);

    field.setFieldPuyo(newFieldPuyo);

    return field.toInterface();
  }
}
