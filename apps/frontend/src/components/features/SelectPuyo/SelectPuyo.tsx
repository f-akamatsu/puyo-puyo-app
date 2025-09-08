import { Center, SimpleGrid } from '@chakra-ui/react';
import { Puyo } from '../../common/Puyo/Puyo';
import { Kesu } from './Kesu/Kesu';

const puyoColorList = [1, 2, 3, 4, 5, 9, 0];
const bgColorList: { [key: number]: string } = {
  1: '#95E091',
  2: '#EE8E8A',
  3: '#85AAE6',
  4: '#FCCD86',
  5: '#CC9BE9',
  9: '#CBCFD5',
  0: '#FFFF44',
};

export interface SelectPuyoProps {
  selectedPuyoColor: number;
  onClick: (newPuyoColor: number) => void;
}

export function SelectPuyo({ selectedPuyoColor, onClick }: SelectPuyoProps) {
  const opacity = (puyoColor: number) => {
    return puyoColor === selectedPuyoColor ? 1 : 0.3;
  };

  const bgColor = (puyoColor: number) => {
    return puyoColor === selectedPuyoColor ? bgColorList[puyoColor] : undefined;
  };

  return (
    <SimpleGrid
      columns={3}
      w='fit-content'
      h='fit-content'
      bgColor='#FCFCFC'
      p='6px'
      borderWidth='4px'
      borderColor='#1E88E5'
      borderStyle='solid'
      borderRadius='10px'
    >
      {puyoColorList.map((puyoColor, index) => (
        <Center
          key={index}
          w='44px'
          h='44px'
          m='2px'
          bgColor={bgColor(puyoColor)}
          opacity={opacity(puyoColor)}
          borderRadius='50%'
          cursor='pointer'
          onClick={() => {
            onClick(puyoColor);
          }}
        >
          {puyoColor === 0 ? <Kesu /> : <Puyo puyoColor={puyoColor} />}
        </Center>
      ))}
    </SimpleGrid>
  );
}
