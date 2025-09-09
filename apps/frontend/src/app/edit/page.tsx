'use client';

import { FieldCoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldService } from '@/logic/service/field.service';
import { useRef, useState } from 'react';
import { EditPresenter } from './presenter';
import type { FieldCanvasHandle } from '@/components/features/Field/FieldCanvas';

export default function Edit() {
  const fieldServie = new FieldService();

  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [scoreText, setScoreText] = useState<string | undefined>(undefined);
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
      });
      setFieldPuyos(result.fieldPuyos);
      setScoreText(undefined);
      setScore(result.score.total);
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
      overlayPuyos={[]}
      score={score}
      scoreText={scoreText}
      onClickSelectPuyo={setSelectedPuyoColor}
      onClickFieldCell={handleClickFieldCell}
      onClickStartChain={handleClickStartChain}
      fieldCanvasRef={canvasRef}
      onScoreDisplay={(p) => {
        if (p.type === 'formula') {
          setScoreText(p.text);
        } else {
          setScoreText(undefined);
          setScore(p.value);
        }
      }}
    />
  );
}
