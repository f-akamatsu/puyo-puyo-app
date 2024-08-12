import { Frame } from '../../common/Frame/Frame';
import { PuyoOnFieldBody } from './PuyoOnFieldBody/PuyoOnFieldBody';
import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { Score } from './Score/Score';
import { Flex } from '@chakra-ui/react';

export interface FieldProps {
  fieldPuyos: FieldPuyoInterface[];
  score: number;
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
}

export function Field({ fieldPuyos, score, onClickFieldCell }: FieldProps) {
  return (
    <Frame>
      <Flex flexDir='column'>
        <PuyoOnFieldBody onClickFieldCell={onClickFieldCell} fieldPuyos={fieldPuyos} />
        <Score score={score} />
      </Flex>
    </Frame>
  );
}
