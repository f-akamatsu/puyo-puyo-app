'use client';

import { useState } from 'react';
import { EditorPresenter } from './presenter';
import { CoordInterface, FieldPuyoInterface } from '@/interfaces/FieldInterfaces';
import { FieldService } from '@/logic/field/service/field.service';

export default function Edit() {
  const fieldServie = new FieldService();

  const [selectedPuyoColor, setSelectedPuyoColor] = useState<number>(1);
  const [fieldPuyos, setFieldPuyos] = useState<FieldPuyoInterface[]>([]);
  const [score, setScore] = useState<number>(0);

  /**
   * フィールドがクリックされたとき
   */
  const handleClickFieldCell = (coord: CoordInterface) => {
    if (selectedPuyoColor === 0) {
      removeFieldPuyo(coord);
    } else {
      setFieldPuyo(coord);
    }
  };

  /**
   * フィールドのぷよを消す
   */
  const removeFieldPuyo = (coord: CoordInterface) => {
    const newFieldPuyos = fieldServie.removeFieldPuyo(fieldPuyos, coord);
    setFieldPuyos(newFieldPuyos);
  };

  /**
   * フィールドにぷよを置く
   */
  const setFieldPuyo = (coord: CoordInterface) => {
    const newFieldPuyo: FieldPuyoInterface = {
      puyoColor: selectedPuyoColor,
      coord,
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
