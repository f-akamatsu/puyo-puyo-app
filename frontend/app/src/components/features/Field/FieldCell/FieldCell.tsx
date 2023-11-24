import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface FieldCellProps {
  x: number;
  y: number;
  onClickFieldCell?: (x: number, y: number) => void;
}

export function FieldCell({ x, y, onClickFieldCell }: FieldCellProps) {
  const onClick = () => {
    if (onClickFieldCell) {
      onClickFieldCell(x, y);
    }
  };

  const opacity = useMemo(() => {
    return y < 12 ? 0.5 : 0;
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
