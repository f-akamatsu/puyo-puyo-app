import { StickTogetherInterface } from '@/interfaces/FieldInterfaces';
import { Img, ImgProps } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface PuyoProps extends ImgProps {
  puyoColor: number;
  stickTogether?: StickTogetherInterface;
}

export function Puyo({ puyoColor, stickTogether, ...otherProps }: PuyoProps) {
  const src = useMemo(() => {
    const _c = puyoColor;

    let _s: string;
    if (stickTogether === undefined) {
      _s = '0000';
    } else {
      const a = stickTogether.above ? '1' : '0';
      const r = stickTogether.right ? '1' : '0';
      const b = stickTogether.below ? '1' : '0';
      const l = stickTogether.left ? '1' : '0';
      _s = `${a}${r}${b}${l}`;
    }

    return `${_c}/${_s}.svg`;
  }, [puyoColor, stickTogether]);

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
