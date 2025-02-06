import { Box, Text } from '@chakra-ui/react';

export function Kesu() {
  return (
    <Box w='34px' h='34px' position='relative' userSelect='none'>
      <Text as='span' position='absolute' top='-2px' left='0px' fontWeight='bold'>
        け
      </Text>
      <Text as='span' position='absolute' bottom='-2px' right='0px' fontWeight='bold'>
        す
      </Text>
    </Box>
  );
}
