import { FieldPuyoConnectInterface } from '@/interfaces/FieldPuyoInterfaces';
import { Img, ImgProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps extends ImgProps {
  pColor: number;
  connect?: FieldPuyoConnectInterface;
}

export function Puyo({ pColor, connect, ...otherProps }: PuyoProps) {
  const src = useMemo(() => {
    const col = pColor;

    let con: string;
    if (connect === undefined) {
      con = '0000';
    } else {
      const a = connect.isConnectedToAbove ? '1' : '0';
      const r = connect.isConnectedToRight ? '1' : '0';
      const b = connect.isConnectedToBelow ? '1' : '0';
      const l = connect.isConnectedToLeft ? '1' : '0';
      con = `${a}${r}${b}${l}`;
    }

    return `${col}/${con}.svg`;
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
