import { ConnectInterface } from '@/interfaces/FieldInterfaces';
import { Img, ImgProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps extends ImgProps {
  puyoColor: number;
  connect?: ConnectInterface;
}

export function Puyo({ puyoColor, connect, ...otherProps }: PuyoProps) {
  const src = useMemo(() => {
    const _c = puyoColor;

    let _s: string;
    if (connect === undefined) {
      _s = '0000';
    } else {
      const a = connect.above ? '1' : '0';
      const r = connect.right ? '1' : '0';
      const b = connect.below ? '1' : '0';
      const l = connect.left ? '1' : '0';
      _s = `${a}${r}${b}${l}`;
    }

    return `${_c}/${_s}.svg`;
  }, [puyoColor, connect]);

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
