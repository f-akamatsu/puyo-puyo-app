import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldBody } from '../FieldBody/FieldBody';
import { Box } from '@chakra-ui/react';
import { Puyo } from '../../../common/Puyo/Puyo';

export interface PuyoOnFieldBodyProps {
  fieldPuyos: FieldPuyoInterface[];
  onClickFieldCell?: (x: number, y: number) => void;
}

export function PuyoOnFieldBody({ fieldPuyos, onClickFieldCell }: PuyoOnFieldBodyProps) {
  const convertY = (y: number) => {
    return 12 - y;
  };

  const top = (y: number) => {
    return `${convertY(y) * 30}px`;
  };

  const left = (x: number) => {
    return `${x * 32}px`;
  };

  return (
    <Box position='relative'>
      <FieldBody onClickFieldCell={onClickFieldCell} top={0} left={0} />
      {fieldPuyos.map((p) => (
        <Puyo
          puyoColor={p.puyoColor}
          stickTogether={p.stickTogether}
          position='absolute'
          top={top(p.coord.y)}
          left={left(p.coord.x)}
        />
      ))}
    </Box>
  );
}
