import { Frame } from '@/components/common/Frame/Frame';
import { FieldCanvas } from '@/components/features/Field/FieldCanvas';
import { Score as ScoreDisplay } from '@/components/features/Field/Score/Score';
import { SelectPuyo } from '@/components/features/SelectPuyo/SelectPuyo';
import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Button, Flex } from '@chakra-ui/react';

export interface EditPresenterProps {
  selectedPuyoColor: number;
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  onClickSelectPuyo: (newPuyoColor: number) => void;
  onClickFieldCell: (fieldCoord: FieldCoordInterface) => void;
  onClickStartChain: () => void;
}

export function EditPresenter({
  selectedPuyoColor,
  fieldPuyos,
  score,
  onClickSelectPuyo,
  onClickFieldCell,
  onClickStartChain,
}: EditPresenterProps) {
  return (
    <Flex gap={4} alignItems='flex-start'>
      <SelectPuyo selectedPuyoColor={selectedPuyoColor} onClick={onClickSelectPuyo} />
      <Button onClick={onClickStartChain}>連鎖</Button>
      <Frame>
        <FieldCanvas fieldPuyos={fieldPuyos} onClickFieldCell={onClickFieldCell} />
        <ScoreDisplay score={score} />
      </Frame>
    </Flex>
  );
}
