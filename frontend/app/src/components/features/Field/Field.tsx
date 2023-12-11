import { Frame } from '../../common/Frame/Frame';
import { PuyoOnFieldBody } from './PuyoOnFieldBody/PuyoOnFieldBody';
import { FieldInterface } from '@/interfaces/FieldPuyoInterfaces';

export interface FieldProps {
  field: FieldInterface;
  onClickFieldCell?: (x: number, y: number) => void;
}

export function Field({ field, onClickFieldCell }: FieldProps) {
  return (
    <Frame>
      <PuyoOnFieldBody onClickFieldCell={onClickFieldCell} fieldPuyoList={field.fieldPuyoList} />
    </Frame>
  );
}
