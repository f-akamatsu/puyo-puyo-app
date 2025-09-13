import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface FrameProps {
  children: ReactNode;
}

export function Frame({ children }: FrameProps) {
  return (
    <Box
      bgColor='#FFFFFF'
      p='6px'
      width='fit-content'
      skewY={-5}
      transform='auto'
      borderRadius='10px'
      shadow='lg'
    >
      <Box bgColor='blue.500' p='6px' width='fit-content' borderRadius='4px'>
        <Box transform='auto' skewY={5} my='10px'>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
