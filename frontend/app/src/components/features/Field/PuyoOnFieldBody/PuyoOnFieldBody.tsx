import { FieldBody } from '../FieldBody/FieldBody';

export interface PuyoOnFieldBodyProps {
  onClickFieldCell?: (x: number, y: number) => void;
}

export function PuyoOnFieldBody({ onClickFieldCell }: PuyoOnFieldBodyProps) {
  // TODO 続きここから
  return <FieldBody onClickFieldCell={onClickFieldCell} />;
}
