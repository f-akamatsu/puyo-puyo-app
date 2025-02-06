import { FieldCoordInterface } from '@/interfaces/FieldInterfaces';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface FieldCellProps {
  x: number;
  y: number;
  onClickFieldCell?: (fieldCoord: FieldCoordInterface) => void;
}

export function FieldCell({ x, y, onClickFieldCell }: FieldCellProps) {
  const onClick = () => {
    if (onClickFieldCell) {
      onClickFieldCell({ x, y });
    }
  };

  const opacity = useMemo(() => {
    return y < 12 ? 0.7 : 0;
  }, [y]);

  return (
    <Box
      width='32px'
      height='30px'
      backgroundColor='#000000'
      opacity={opacity}
      _hover={onClickFieldCell ? { backgroundColor: '#00FFFF', opacity: 1 } : {}}
      onClick={onClick}
    />
  );
}
