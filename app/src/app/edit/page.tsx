'use client';

import { useState } from 'react';
import { EditorPresenter } from './presenter';
import { FieldPuyoInterface } from '@/interfaces/FieldInterfaces';

export default function Edit() {
  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [score, setScore] = useState<number>(0);

  return (
    <EditorPresenter
      selectedPuyoColor={selectedPuyoColor}
      fieldPuyos={fieldPuyos}
      score={score}
      onClickSelectPuyo={setSelectedPuyoColor}
    />
  );
}
