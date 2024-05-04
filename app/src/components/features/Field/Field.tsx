import { Frame } from '../../common/Frame/Frame';
import { PuyoOnFieldBody } from './PuyoOnFieldBody/PuyoOnFieldBody';
import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Score } from './Score/Score';

export interface FieldProps {
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  onClickFieldCell?: (x: number, y: number) => void;
}

export function Field({ fieldPuyos, score, onClickFieldCell }: FieldProps) {
  return (
    <Frame>
      <>
        <PuyoOnFieldBody onClickFieldCell={onClickFieldCell} fieldPuyos={fieldPuyos} />
        <Score score={score} />
      </>
    </Frame>
  );
}
