import { StackProps, HStack, VStack } from '@chakra-ui/react';
import { FieldCell } from '../FieldCell/FieldCell';
import { FieldCoordInterface } from '@/interfaces/FieldInterfaces';

export interface FieldBodyProps extends StackProps {
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
}

export function FieldBody({ onClickFieldCell, ...otherProps }: FieldBodyProps) {
  return (
    <VStack gap={0} alignItems='left' {...otherProps}>
      {Array.from({ length: 13 }, (_, v) => (
        <HStack key={12 - v} gap={0}>
          {Array.from({ length: 6 }, (_, h) => (
            <FieldCell key={h} x={h} y={12 - v} onClickFieldCell={onClickFieldCell} />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
