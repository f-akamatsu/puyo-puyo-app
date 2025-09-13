import { Frame } from '@/components/common/Frame/Frame';
import { FieldCanvas, FieldCanvasHandle } from '@/components/features/Field/FieldCanvas';
import { Score as ScoreDisplay } from '@/components/features/Field/Score/Score';
import { OjamaForecastPanel } from '@/components/features/Ojama/OjamaForecastPanel';
import { SelectPuyo } from '@/components/features/SelectPuyo/SelectPuyo';
import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import type { OjamaForecastInterface } from '@/interfaces/OjamaInterfaces';
import { Button, Flex } from '@chakra-ui/react';
import type React from 'react';

export interface EditPresenterProps {
  selectedPuyoColor: number;
  fieldPuyos: FieldPuyoInterface[];
  scoreDisplay: number | string;
  forecast?: OjamaForecastInterface;
  onClickSelectPuyo: (newPuyoColor: number) => void;
  onClickFieldCell: (fieldCoord: FieldCoordInterface) => void;
  onClickStartChain: () => void;
  fieldCanvasRef?: React.Ref<FieldCanvasHandle>;
  onScoreDisplay?: (
    payload: { type: 'formula'; text: string } | { type: 'total'; value: number }
  ) => void;
}

export function EditPresenter({
  selectedPuyoColor,
  fieldPuyos,
  scoreDisplay,
  onClickSelectPuyo,
  onClickFieldCell,
  onClickStartChain,
  fieldCanvasRef,
  onScoreDisplay,
  forecast,
}: EditPresenterProps) {
  return (
    <Flex gap={4} alignItems='flex-start'>
      <SelectPuyo selectedPuyoColor={selectedPuyoColor} onClick={onClickSelectPuyo} />
      <Button onClick={onClickStartChain} colorPalette='blue'>
        スタート
      </Button>
      <Frame>
        <FieldCanvas
          ref={fieldCanvasRef}
          fieldPuyos={fieldPuyos}
          onClickFieldCell={onClickFieldCell}
          onScoreDisplay={onScoreDisplay}
        />
        <ScoreDisplay text={scoreDisplay} />
      </Frame>
      <OjamaForecastPanel forecast={forecast} />
    </Flex>
  );
}
