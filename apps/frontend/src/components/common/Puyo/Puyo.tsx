import { ConnectInterface } from '@/interfaces/FieldInterfaces';
import { Image, ImageProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps extends ImageProps {
  puyoColor: number;
  connect?: ConnectInterface;
}

export function Puyo({ puyoColor, connect, ...otherProps }: PuyoProps) {
  const src = useMemo(() => {
    const _c = puyoColor;

    let _s: string;
    if (connect === undefined) {
      _s = '0000';
    } else if (puyoColor === 9) {
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
    <Image
      src={`images/puyo/${src}`}
      w='31.5px'
      h='30px'
      userSelect='none'
      pointerEvents='none'
      {...otherProps}
    />
  );
}
