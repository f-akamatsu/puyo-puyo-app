import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FrameProps {
  children: ReactNode;
}

export function Frame({ children }: FrameProps) {
  return (
    <Box
      backgroundColor='#CCCCCC'
      p='6px'
      width='fit-content'
      skewY={-5}
      transform='auto'
      borderRadius='10px'
    >
      <Box backgroundColor='#1E88E5' p='6px' width='fit-content' borderRadius='4px'>
        <Box transform='auto' skewY={5} my='10px'>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
