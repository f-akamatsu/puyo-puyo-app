import { Field } from '@/components/features/Field/Field';
import { SelectPuyo } from '@/components/features/SelectPuyo/SelectPuyo';
import { CoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Flex } from '@chakra-ui/react';

export interface EditorPresenterProps {
  selectedPuyoColor: number;
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  onClickSelectPuyo: (newPuyoColor: number) => void;
  onClickFieldCell: (coord: CoordInterface) => void;
}

export function EditorPresenter({
  selectedPuyoColor,
  fieldPuyos,
  score,
  onClickSelectPuyo,
  onClickFieldCell,
}: EditorPresenterProps) {
  return (
    <Flex>
      <SelectPuyo selectedPuyoColor={selectedPuyoColor} onClick={onClickSelectPuyo} />
      <Field fieldPuyos={fieldPuyos} score={score} onClickFieldCell={onClickFieldCell} />
    </Flex>
  );
}
