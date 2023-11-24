import { FieldPuyoConnectInterface, FieldPuyoInterface } from '@/interfaces/FieldPuyoInterfaces';
import { Img } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps {
  color: number;
  connect: FieldPuyoConnectInterface;
}

export function Puyo({ color, connect }: PuyoProps) {
  const src = useMemo(() => {
    const col = color;
    const ca = connect.isConnectedToAbove ? '1' : '0';
    const cr = connect.isConnectedToRight ? '1' : '0';
    const cb = connect.isConnectedToBelow ? '1' : '0';
    const cl = connect.isConnectedToLeft ? '1' : '0';

    return `${col}/${ca}${cr}${cb}${cl}.svg`;
  }, [color, connect]);

  return (
    <Img src={`images/puyo/${src}`} w='32px' h='30px' userSelect='none' pointerEvents='none' />
  );
}
