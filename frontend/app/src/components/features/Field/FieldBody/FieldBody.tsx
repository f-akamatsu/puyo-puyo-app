import { HStack, VStack } from '@chakra-ui/react';
import { FieldCell } from '../FieldCell/FieldCell';

export interface FieldBodyProps {
  onClickFieldCell?: (x: number, y: number) => void;
}

export function FieldBody({ onClickFieldCell }: FieldBodyProps) {
  return (
    <VStack spacing={0}>
      {Array.from({ length: 13 }, (_, v) => (
        <HStack key={12 - v} spacing={0}>
          {Array.from({ length: 6 }, (_, h) => (
            <FieldCell key={h} x={h} y={12 - v} onClickFieldCell={onClickFieldCell} />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
