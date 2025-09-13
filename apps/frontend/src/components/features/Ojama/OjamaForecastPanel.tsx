import { Forecast, type ForecastType } from '@/components/common/Forecast/Forecast';
import type { OjamaForecastInterface } from '@/interfaces/OjamaInterfaces';
import { Box, Card, Grid, GridItem, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

export interface OjamaForecastPanelProps {
  /** 予告（インターフェース）を受け取り表示 */
  forecast?: OjamaForecastInterface;
}

/**
 * おじゃまぷよ表示
 * - おじゃまぷよの個数を表示する
 * - おじゃまの予告アイコンを表示する（最大6個まで）
 */
export function OjamaForecastPanel({ forecast }: OjamaForecastPanelProps) {
  // セルサイズ（フィールドのぷよ感に寄せる）
  const CELL_W = 31.5;
  const CELL_H = 30;
  const MAX = 6;

  const ojamaCount = forecast?.ojamaCount ?? 0;
  const shown = useMemo<ForecastType[]>(() => {
    const icons: ForecastType[] = [];
    const packs = [...(forecast?.packs ?? [])].sort((a, b) => b.unit - a.unit);
    for (const p of packs) {
      const t = p.type as ForecastType;
      for (let i = 0; i < p.count && icons.length < MAX; i++) icons.push(t);
      if (icons.length >= MAX) break;
    }
    return icons;
  }, [forecast]);

  const cells = Array.from({ length: MAX });

  return (
    <Card.Root bgColor='white' variant='elevated'>
      <Card.Body>
        <Box display='flex' alignItems='baseline' gap={2} mb={2}>
          <Text
            as='span'
            fontSize='28px'
            fontWeight='black'
            color='white'
            textShadow='-1px -1px 1px #303030, -1px 0px 1px #303030, -1px 1px 1px #303030, 0px -1px 1px #303030, 0px 0px 1px #303030, 0px 1px 1px #303030, 1px -1px 1px #303030, 1px 0px 1px #303030, 2px 2px 1px #303030'
            lineHeight='1'
          >
            {ojamaCount}
          </Text>
          <Text as='span' fontSize='sm'>
            個
          </Text>
        </Box>
        {/* 横一列（6セル） */}
        <Grid
          templateColumns={`repeat(6, ${CELL_W}px)`}
          templateRows={`repeat(1, ${CELL_H}px)`}
          gap={1}
          overflow='visible'
        >
          {cells.map((_, i) => {
            const type = shown[i];
            return (
              <GridItem
                key={`cell-${i}`}
                w={`${CELL_W}px`}
                h={`${CELL_H}px`}
                overflow='visible'
                position='relative'
              >
                {type && (
                  <Forecast
                    type={type}
                    position='absolute'
                    bottom={0}
                    left='50%'
                    transform='translateX(-50%)'
                  />
                )}
              </GridItem>
            );
          })}
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}

export default OjamaForecastPanel;
