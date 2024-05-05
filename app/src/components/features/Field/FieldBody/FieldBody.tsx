import { BoxProps, HStack, VStack } from '@chakra-ui/react';
import { FieldCell } from '../FieldCell/FieldCell';
import { FieldCoordInterface } from '@/interfaces/FieldInterfaces';

export interface FieldBodyProps extends BoxProps {
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
}

export function FieldBody({ onClickFieldCell, ...otherProps }: FieldBodyProps) {
  return (
    <VStack spacing={0} alignItems='left' {...otherProps}>
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
