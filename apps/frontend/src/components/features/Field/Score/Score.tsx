import { Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const DISP_LEN = 8;

export interface ScoreProps {
  text: number | string; // 数値なら0詰め、文字列はそのまま
}

export function Score({ text }: ScoreProps) {
  const disp = useMemo(() => {
    if (typeof text === 'number') return String(text).padStart(DISP_LEN, '0');
    // 半角スペースは、数字幅に揃う FIGURE SPACE(U+2007) に置換して揃える
    return String(text).replace(/ /g, '\u2007');
  }, [text]);

  return (
    <Text
      as='div'
      m={0}
      textAlign='right'
      userSelect='none'
      fontSize='30px'
      fontFamily='Arial Black'
      color='#FEFEFE'
      textShadow='-1px -1px 1px #303030, -1px 0px 1px #303030, -1px 1px 1px #303030, 0px -1px 1px #303030, 0px 0px 1px #303030, 0px 1px 1px #303030, 1px -1px 1px #303030, 1px 0px 1px #303030, 2px 2px 1px #303030'
      lineHeight='100%'
    >
      {disp}
    </Text>
  );
}
