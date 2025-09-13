'use client';

import type { FieldCanvasHandle } from '@/components/features/Field/FieldCanvas';
import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import type { OjamaForecastInterface } from '@/interfaces/OjamaInterfaces';
import { FieldService } from '@/logic/service/field.service';
import { useRef, useState } from 'react';
import { EditPresenter } from './presenter';

export default function Edit() {
  const fieldServie = new FieldService();

  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [scoreDisplay, setScoreDisplay] = useState<number | string>(0);
  const [forecast, setForecast] = useState<OjamaForecastInterface | undefined>(undefined);
  const canvasRef = useRef<FieldCanvasHandle | null>(null);

  const handleClickFieldCell = (fieldCoord: FieldCoordInterface) => {
    if (isAnimating) return;
    if (selectedPuyoColor === 0) {
      removeFieldPuyo(fieldCoord);
    } else {
      setFieldPuyo(fieldCoord);
    }
  };

  const handleClickStartChain = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    try {
      const result = fieldServie.dropAndChainWithEvents(fieldPuyos);
      await canvasRef.current?.animateWithEvents({
        initialDropEvent: result.initialDropEvent,
        chainEvent: result.chainEvent,
        scoreChains: result.score.chains,
      });
      setFieldPuyos(result.fieldPuyos);
      setScoreDisplay(result.score.total);
      setForecast(result.forecast);
    } finally {
      setIsAnimating(false);
    }
  };

  const removeFieldPuyo = (fieldCoord: FieldCoordInterface) => {
    const newFieldPuyos = fieldServie.removeFieldPuyo(fieldPuyos, fieldCoord);
    setFieldPuyos(newFieldPuyos);
  };

  const setFieldPuyo = (fieldCoord: FieldCoordInterface) => {
    const newFieldPuyo: FieldPuyoInterface = {
      puyoColor: selectedPuyoColor,
      fieldCoord: fieldCoord,
      connect: { above: false, right: false, below: false, left: false },
    };
    const newFieldPuyos = fieldServie.setFieldPuyo(fieldPuyos, newFieldPuyo);
    setFieldPuyos(newFieldPuyos);
  };

  return (
    <EditPresenter
      selectedPuyoColor={selectedPuyoColor}
      fieldPuyos={fieldPuyos}
      scoreDisplay={scoreDisplay}
      forecast={forecast}
      onClickSelectPuyo={setSelectedPuyoColor}
      onClickFieldCell={handleClickFieldCell}
      onClickStartChain={handleClickStartChain}
      fieldCanvasRef={canvasRef}
      onScoreDisplay={(p) => {
        setScoreDisplay(p.type === 'formula' ? p.text : p.value);
      }}
    />
  );
}
