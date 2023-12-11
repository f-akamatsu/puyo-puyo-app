import { Text } from '@chakra-ui/react';
import { useMemo } from 'react';

const DISP_LEN = 8;

export interface ScoreProps {
  score: number;
}

export function Score({ score }: ScoreProps) {
  const dispScore = useMemo(() => String(score).padStart(DISP_LEN, '0'), [score]);

  return (
    <Text
      as='div'
      w='192px'
      m={0}
      textAlign='right'
      userSelect='none'
      fontSize='30px'
      fontFamily='Arial Black'
      color='#FEFEFE'
      textShadow='-1px -1px 1px #303030, -1px 0px 1px #303030, -1px 1px 1px #303030, 0px -1px 1px #303030, 0px 0px 1px #303030, 0px 1px 1px #303030, 1px -1px 1px #303030, 1px 0px 1px #303030, 2px 2px 1px #303030'
    >
      {dispScore}
    </Text>
  );
}
