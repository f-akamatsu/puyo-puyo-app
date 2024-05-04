import { Field } from '@/components/features/Field/Field';
import { SelectPuyo } from '@/components/features/SelectPuyo/SelectPuyo';
import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Flex } from '@chakra-ui/react';

export interface EditorPresenterProps {
  selectedPuyoColor: number;
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  onClickSelectPuyo: (newPuyoColor: number) => void;
}

export function EditorPresenter({
  selectedPuyoColor,
  fieldPuyos,
  score,
  onClickSelectPuyo,
}: EditorPresenterProps) {
  return (
    <Flex>
      <SelectPuyo selectedPuyoColor={selectedPuyoColor} onClick={onClickSelectPuyo} />
      <Field fieldPuyos={fieldPuyos} score={score} />
    </Flex>
  );
}
