import { FieldPuyoConnectInterface } from '@/interfaces/FieldPuyoInterfaces';
import { Img, ImgProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps extends ImgProps {
  pColor: number;
  connect: FieldPuyoConnectInterface;
}

export function Puyo({ pColor, connect, ...otherProps }: PuyoProps) {
  const src = useMemo(() => {
    const col = pColor;
    const ca = connect.isConnectedToAbove ? '1' : '0';
    const cr = connect.isConnectedToRight ? '1' : '0';
    const cb = connect.isConnectedToBelow ? '1' : '0';
    const cl = connect.isConnectedToLeft ? '1' : '0';

    return `${col}/${ca}${cr}${cb}${cl}.svg`;
  }, [pColor, connect]);

  return (
    <Img
      src={`images/puyo/${src}`}
      w='32px'
      h='30px'
      userSelect='none'
      pointerEvents='none'
      {...otherProps}
    />
  );
}
