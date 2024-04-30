import { Puyo } from '../../common/Puyo/Puyo';
import { Center, SimpleGrid } from '@chakra-ui/react';
import { Kesu } from './Kesu/Kesu';

const pColorList = [1, 2, 3, 4, 5, 9, 0];
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
  selectedPColor: number;
  onClick: (newPColor: number) => void;
}

export function SelectPuyo({ selectedPColor, onClick }: SelectPuyoProps) {
  const opacity = (pColor: number) => {
    return pColor === selectedPColor ? 1 : 0.3;
  };

  const bgColor = (pColor: number) => {
    return pColor === selectedPColor ? bgColorList[pColor] : undefined;
  };

  return (
    <SimpleGrid
      columns={3}
      w='fit-content'
      bgColor='#FCFCFC'
      p='6px'
      borderWidth='4px'
      borderColor='#1E88E5'
      borderStyle='solid'
      borderRadius='10px'
    >
      {pColorList.map((pColor, index) => (
        <Center
          key={index}
          w='44px'
          h='44px'
          m='2px'
          bgColor={bgColor(pColor)}
          opacity={opacity(pColor)}
          borderRadius='50%'
          cursor='pointer'
          onClick={() => {
            onClick(pColor);
          }}
        >
          {pColor === 0 ? <Kesu /> : <Puyo pColor={pColor} />}
        </Center>
      ))}
    </SimpleGrid>
  );
}
