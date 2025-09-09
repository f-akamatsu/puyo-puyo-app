import { Frame } from '@/components/common/Frame/Frame';
import { FieldCanvas, FieldCanvasHandle } from '@/components/features/Field/FieldCanvas';
import { Score as ScoreDisplay } from '@/components/features/Field/Score/Score';
import { SelectPuyo } from '@/components/features/SelectPuyo/SelectPuyo';
import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Button, Flex } from '@chakra-ui/react';
import type React from 'react';

export interface EditPresenterProps {
  selectedPuyoColor: number;
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  scoreText?: string;
  onClickSelectPuyo: (newPuyoColor: number) => void;
  onClickFieldCell: (fieldCoord: FieldCoordInterface) => void;
  onClickStartChain: () => void;
  fieldCanvasRef?: React.Ref<FieldCanvasHandle>;
  onScoreDisplay?: (payload: { type: 'formula'; text: string } | { type: 'total'; value: number }) => void;
}

export function EditPresenter({
  selectedPuyoColor,
  fieldPuyos,
  score,
  scoreText,
  onClickSelectPuyo,
  onClickFieldCell,
  onClickStartChain,
  fieldCanvasRef,
  onScoreDisplay,
}: EditPresenterProps) {
  return (
    <Flex gap={4} alignItems='flex-start'>
      <SelectPuyo selectedPuyoColor={selectedPuyoColor} onClick={onClickSelectPuyo} />
      <Button onClick={onClickStartChain}>連鎖</Button>
      <Frame>
        <FieldCanvas
          ref={fieldCanvasRef}
          fieldPuyos={fieldPuyos}
          onClickFieldCell={onClickFieldCell}
          onScoreDisplay={onScoreDisplay}
        />
        <ScoreDisplay text={scoreText ?? score} />
      </Frame>
    </Flex>
  );
}
