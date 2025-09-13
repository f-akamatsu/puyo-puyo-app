import { Image, ImageProps } from '@chakra-ui/react';

export type ForecastType = 'small' | 'medium' | 'rock' | 'star' | 'moon' | 'crown' | 'commet';

export interface ForecastProps extends ImageProps {
  type: ForecastType;
}

export function Forecast({ type, ...imgProps }: ForecastProps) {
  // medium を 30px とし、他は viewBox 横幅の比で相対設定（0.5px 単位で丸め）
  // viewBox widths: small 27.9914, medium 36.3185, rock 37.7439, star 40.4999, moon 37.5254, crown 40.1250, commet 56.6239
  const defaultWidthPxMap: Record<ForecastType, number> = {
    small: 23.0,
    medium: 30.0,
    rock: 31.0,
    star: 33.5,
    moon: 31.0,
    crown: 33.0,
    commet: 47.0,
  };

  const resolvedWidth = `${defaultWidthPxMap[type]}px`;

  return (
    <Image
      src={`images/forecast/${type}.svg`}
      alt={type}
      userSelect='none'
      draggable={false}
      pointerEvents='none'
      maxW='none'
      w={resolvedWidth}
      {...imgProps}
    />
  );
}
