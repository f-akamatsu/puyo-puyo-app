'use client';

import { useState } from 'react';
import { EditorPresenter } from './presenter';
import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldService } from '@/logic/field/service/field.service';

export default function Edit() {
  const fieldServie = new FieldService();

  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleClickFieldCell = (x: number, y: number) => {
    const newFieldPuyo: FieldPuyoInterface = {
      puyoColor: selectedPuyoColor,
      coord: { x, y },
      connect: { above: false, right: false, below: false, left: false },
    };
    const newFieldPuyos = fieldServie.setFieldPuyo(fieldPuyos, newFieldPuyo);
    setFieldPuyos(newFieldPuyos);
  };

  return (
    <EditorPresenter
      selectedPuyoColor={selectedPuyoColor}
      fieldPuyos={fieldPuyos}
      score={score}
      onClickSelectPuyo={setSelectedPuyoColor}
      onClickFieldCell={handleClickFieldCell}
    />
  );
}
